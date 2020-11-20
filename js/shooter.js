window.addEventListener("load", function(){
	var canvas = document.querySelector("#holst");
	var scena = canvas.getContext("2d");
	var fon = new Image();
	var meteorits = [];
	var speedGeneration = 100;
	function rnd(min, max){//генерато случайного числа от мин до макс.
		var r = min + Math.random() * (max - min + 1);
		return Math.floor(r);
	}
	var spaceship = {//объект корабль в литеральной нотации
		Name:"Покоритель небытия",
		Size:50,
		X:0,
		Y:600,
		sprite:new Image(),
		bullets:[],
		IsShooting:false,
		ShootInterval:40,
		sound:new Audio("sounds/blaster.mp3"),
		Move:function(dx){
			this.X += dx;
			if(this.X < 0 || this.X > canvas.width - this.Size){
				this.X -= dx;
			}
			
		},
		ShootDelay:function(){
			if(this.IsShooting == true){
				this.ShootInterval--;
				if(this.ShootInterval == 0){
					this.ShootInterval = 40;
					this.IsShooting = false;
				}
			}
		},
		Shoot:function(){
			if(this.IsShooting == false){
				this.bullets.push(new Bullet());
				this.sound.play();
				this.IsShooting = true;
			};
		}
	};
	class Bullet{//это класс пулька (класс это чертёж для создания множества объектов)
		constructor(){//это конструктор класса
			this.X = spaceship.X + spaceship.Size/2-10/2;//это свойство X
			this.Y = 600;//это свойство Y
			this.Size = 10;//размер нашей пульки
			this.Speed = 5;//скорость полёта пули
			this.Del = false;//метка удаления пульки
		
		}
		Move(){
				this.Y -= this.Speed;
				if(this.Y < 0){
					this.Del = true;
				}
			}
	}
	class Meteor{
		constructor(){
			this.X = rnd(0,(canvas.width/50)*50); /*rnd(0,600)*/;
			this.Y = 0;
			this.Size = 50;
			this.Speed = 3;
			this.Del = false;
		}
		Move(){
			this.Y += this.Speed;
			if(this.Y > canvas.height){
				this.Del = true;
			}
		}
	}
	function clearAll(arr){
		var temp = [];
		for(var i = 0; i < arr.length; i++){
			if(arr[i].Del == false){
				temp.push(arr[i]); 
			}
		}
		return temp;
	};
	function meteorGenerator(){
		speedGeneration--;
		if(speedGeneration == 0){
			speedGeneration = 100;
			meteorits.push(new Meteor());
		}
	}
	function update(){//функция обновления игрового мира//
		meteorGenerator();
		for(var i = 0; i < meteorits.length; i++){
			meteorits[i].Move();
		}
		meteorits = clearAll(meteorits);
		spaceship.ShootDelay();
		for(var i = 0; i <spaceship.bullets.length; i++ ){
			spaceship.bullets[i].Move();
		}
		spaceship.bullets = clearAll(spaceship.bullets);
		
	};
	function draw(){//отрисовка игровова мира//
		scena.drawImage(fon,0,0,canvas.width,canvas.height);//очистка всего игрового поля//
		scena.drawImage(spaceship.sprite,spaceship.X,spaceship.Y,spaceship.Size,spaceship.Size);
		for(var i = 0; i < meteorits.length; i++){
			scena.fillRect(meteorits[i].X, meteorits[i].Y,meteorits[i].Size,meteorits[i].Size);
		}
		for(var i = 0; i < spaceship.bullets.length; i++){
			scena.fillRect(spaceship.bullets[i].X, spaceship.bullets[i].Y,spaceship.bullets[i].Size,spaceship.bullets[i].Size);
		}
	};
	
	function game(){
		update();
		draw();
		window.requestAnimationFrame(function(){
			game();
		});
	};
	spaceship.sprite.src = "images/spaceship.png";
	fon.src = "images/space.jpg";
	fon.addEventListener("load",function(){
		window.addEventListener("keydown",function(play){
			if(play.keyCode == 39){
				spaceship.Move(10);
			}
			else if(play.keyCode == 37){
				spaceship.Move(-10);
			}
			else if(play.keyCode == 32){
				spaceship.Shoot();
			}
		});
		game();
	});
});

