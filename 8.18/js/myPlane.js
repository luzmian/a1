

//我的飞机
let myPlane = (function(){
	let plane={
		
		
		//属性
		ele:null,
		fireInterval:300,//子弹发射间隔
		
		//方法
		init:function(){
			this.ele = document.createElement("div");
			gameEngine.ele.appendChild(this.ele);
			this.ele.className = "myplane";
			this.ele.style.left = (gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2+"px";
			this.ele.style.top = gameEngine.ele.offsetHeight-this.ele.offsetHeight+"px";
			return this;
		},
		
		//发射子弹
		fire:function(){
			this.timer = setInterval(()=>{
				//创建子弹
				let bullet = new Bullet();
				bullet.init().move();
			},this.fireInterval);
		},
		
		
		
		
		//移动
		move:function(){
			
			//拖拽
			this.ele.onmousedown=(e)=>{
				e = e||event;
				let disx = e.offsetX;
				let disy = e.offsetY;
				
				document.onmousemove = (e)=>{
					e = e || event;
					
					let x = e.pageX - disx - gameEngine.ele.offsetLeft;
					let y = e.pageY - disy;
					
					if(x<0) x = 0;
					if(x>gameEngine.ele.offsetWidth-plane.ele.offsetWidth){
						x = gameEngine.ele.offsetWidth-plane.ele.offsetWidth;
					}
					
					if(y<0) y = 0;
					
					plane.ele.style.left = x + "px";
					plane.ele.style.top = y + "px";
				}  
				
				document.onmouseup = ()=>{
					document.onmousemove=document.onmouseup=null;
				}
			}
		},
		
		//爆炸
		boom:function(callback){
			//停止发射子弹
			clearInterval(this.timer);
			
			//动画
			let dieImgs = ["images2/me_die1.png", "images2/me_die2.png", "images2/me_die3.png", "images2/me_die4.png"];
			let i = 0;
			let dieTimer = setInterval(()=>{
				
				if(i>=dieImgs.length){
					clearInterval(dieTimer);
					gameEngine.ele.removeChild(plane.ele);
					
					callback();//回调
				}
				else{
					plane.ele.style.backgroundImage = "url("+dieImgs[i++]+")";
				}
				
			},100)
		}
		
		
		
		
	}

	var instance;
	return function(){
		if(!instance){
			instance = plane;				
		}
		return instance;
	}
	


})()




















