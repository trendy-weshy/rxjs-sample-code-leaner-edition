
/**
 * @docs:
 *  create an observable that creates *(250) stars of size 1 to 4 with random co-ordinates on scene
 *  and moves them down the scene using observables that emit the star after every *(20ms)
*/
var StarStream = Rx.Observable.range(1, STAR_NUMBER)
    .map(function() {
        return {
            x: parseInt(Math.random() * canvas.width),
            y: parseInt(Math.random() * canvas.height),
            size: Math.random() * 3 + 1
        };
    })
    .toArray()
    .flatMap(function(starArray) {
        return Rx.Observable.interval(SPEED)
            .map(function() {
                starArray.forEach(function(star) {
                    if (star.y >= canvas.height) {
                        star.y = 0; // Reset star to top of the screen
                    }
                    star.y += 3; // Move star
                });
                return starArray;
            });
    });

/**
 * @docs:
 *  add event listener observable that locates the position of the mouse pointer on mousemove event
 *  then map those co-ordinates into an object f x and y-axis
*/
var mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');
var SpaceShip = mouseMove.map(function(event) {
    return {
        x: event.clientX,
        y: HERO_Y
    };
})
.startWith({
    x: canvas.width / 2,
    y: HERO_Y
});

/**
 * @docs:
 *  
*/
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
    .scan(function(enemyArray) {
        var enemy = {
            x: parseInt(Math.random() * canvas.width),
            y: -30,
            shots: []
        };

        Rx.Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(function() {
            if (!enemy.isDead) {
                enemy.shots.push({ x: enemy.x, y: enemy.y });
            }
            enemy.shots = enemy.shots.filter(isVisible);
        });

        enemyArray.push(enemy)
        return enemyArray.filter(isVisible).filter(function(enemy) {
            return !(enemy.isDead && enemy.shots.length === 0);
        });
        
    }, []);

/**
 * @docs:
 *  
*/
var playerFiring = Rx.Observable.merge(
        Rx.Observable.fromEvent(document, 'keydown'), 
        Rx.Observable.fromEvent(document, 'keyup')
    )
    .filter(function(evt) { return evt.keyCode === 32; })
    .sample(200)
    .timestamp();

var HeroShots = Rx.Observable.combineLatest(
    playerFiring, SpaceShip,
    function(shotEvents, spaceShip) {
        return {
            timestamp: shotEvents.timestamp,
            x: spaceShip.x
        };
    })
    .distinctUntilChanged(function(shot) { return shot.timestamp; })
    .scan(function(shotArray, shot) {
        return shotArray.concat({ x:shot.x, y: HERO_Y });
    }, []);


/**
 * @docs:
 *  combine both starstream and spaceship observables and return to observe the latest values emitted
 *  sample has been used to normalize the speed at which the last value gets emitted for easier synchronization
 *  of the components at the screen
*/
var Game = Rx.Observable.combineLatest(
    StarStream, HeroShots, SpaceShip, Enemies,
    function(stars, heroshots, spaceship, enemies) {
        return {
            stars: stars,
            spaceship: spaceship,
            enemies: enemies,
            heroshots: heroshots
        };
    })
    .sample(SPEED)
    .takeWhile(function(actors) {
        return gameOver(actors.spaceship, actors.enemies) === false;
    }).subscribe(renderScene);
