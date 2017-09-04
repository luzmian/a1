

//敌机

class Enemy extends Base{
	
	//属性
	constructor(type){
		super();
		this.type = type;
		this.hp = 1;
		this.speed = 10;
		this.dieImgs = [];
		this.score = 10;
	}
	
	
	
	//方法
	init(){
		
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		//将当前敌机对象加入到数组
		gameEngine.allEnemys.push(this);
		
		
		switch(this.type) {
			
			//大型飞机
			case this.Enemy_Type_Large: 
				this.ele.className = "enemy-large";
				this.hp = this.Enemy_Hp_Large;
				this.speed = this.Enemy_Speed_Large;
				this.dieImgs = ["images2/plane3_die1.png", "images2/plane3_die2.png", "images2/plane3_die3.png", "images2/plane3_die4.png", "images2/plane3_die5.png", "images2/plane3_die6.png"];
				this.score = 120; 
				
				
				break;
				
			case this.Enemy_Type_Middle: 
				this.ele.className = "enemy-middle";
				this.hp = this.Enemy_Hp_Middle;
				this.speed = this.Enemy_Speed_Middle;
				this.dieImgs = ["images2/plane2_die1.png", "images2/plane2_die2.png", "images2/plane2_die3.png", "images2/plane2_die4.png"];
				this.score = 40;
				
				break;
				
			case this.Enemy_Type_Small:
				this.ele.className="enemy-small";
				this.hp = this.Enemy_Hp_Small;
				this.speed = this.Enemy_Speed_Small;
				this.dieImgs = ["images2/plane1_die1.png", "images2/plane1_die2.png", "images2/plane1_die3.png"];
				this.score = 10;
				
				
				break;
			
			//其他
			default:
				alert("没有这种敌机");
		}
		
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth) )+ "px";
		this.ele.style.top =-this.ele.offsetHeight + "px";
		
		return this;
	}
	
	//移动
	move(){
		
		//let that = this;
		this.timer = setInterval(()=>{
			if(this.ele.offsetTop > gameEngine.ele.offsetHeight){
				clearInterval(this.timer);
				gameEngine.ele.removeChild(this.ele);
				
				//将当前敌机从数组gameEngine.allEnemys中移除
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(this),1);
				
			}
			else{
				this.ele.style.top = this.ele.offsetTop + this.speed + "px";
			}
		},30)
	}
	
	//受伤
	hurt(){
		this.hp--;
		
		if(this.hp==0){
			this.boom();
			gameEngine.totalScore += this.score;
			console.log("分数:" + gameEngine.totalScore);
		}
	}
	
	//爆炸
	boom(){
		//停止移动
		clearInterval(this.timer);
		
		//动画
		//let that = this;
		let i = 0;
		let dieTimer = setInterval(()=>{
			if(i>=this.dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(this.ele);
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(this),1);
			}
			else{
				this.ele.style.backgroundImage = "url(" +this.dieImgs[i++] + ")";
			}
		},100)
		
	}
}


Enemy.prototype.Enemy_Type_Large = 3;
Enemy.prototype.Enemy_Type_Middle = 2;
Enemy.prototype.Enemy_Type_Small = 1;

Enemy.prototype.Enemy_Speed_Large = 2;
Enemy.prototype.Enemy_Speed_Middle = 4;
Enemy.prototype.Enemy_Speed_Small = 7;

Enemy.prototype.Enemy_Hp_Large = 8;
Enemy.prototype.Enemy_Hp_Middle = 3;
Enemy.prototype.Enemy_Hp_Small = 1;













