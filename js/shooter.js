window.addEventListener("load", function(){
	var canvas = document.querySelector("#holst");
	var scena = canvas.getContext("2d");
	var spaceship = {//объект корабль в литеральной нотации
		Name:"Покоритель небытия",
		Size:50,
		X:0,
		Y:600,
		sprite:new Image(),
		bullets:[],
		Move:function(dx){
			this.X += dx;
			if(this.X < 0 || this.X > canvas.width - this.Size){
				this.X -= dx;
			}
			
		},
		Shoot:function(){
			this.bullets.push(new Bullet());
		}
	};
	class Bullet{//это класс пулька (класс это чертёж для создания множества объектов)
		constructor(){//это конструктор класса
			this.X = spaceship.X + spaceship.Size/2-10/2;//это свойство X
			this.Y = 550;//это свойство Y
			this.Size = 10;//размер нашей пульки
			this.Speed = 5;//сорость полёта пули
		
		}
		Move(){
				this.Y -= this.Speed;	
			}
	}
	function draw(){//отрисовка игровова мира//
		scena.clearRect(0,0,canvas.width,canvas.height);//очистка всего игрового поля//
		scena.drawImage(spaceship.sprite,spaceship.X,spaceship.Y,spaceship.Size,spaceship.Size);
		for(var i = 0; i < spaceship.bullets.length; i++){
			scena.fillRect(spaceship.bullets[i].X, spaceship.bullets[i].Y,spaceship.bullets[i].Size,spaceship.bullets[i].Size);
		}
	};
	function game(){
		draw();
		window.requestAnimationFrame(function(){
			game();
		});
	};
	spaceship.sprite.src = "images/spaceship.png";
	spaceship.sprite.addEventListener("load",function(){
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

