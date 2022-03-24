namespace SpriteKind {
    export const player_attack = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`light2`, function (sprite, location) {
    load_area(1)
})
// i honestly don't know why i made these numbers, string would be much easier to understand
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    nail_direction = 2
})
function gravitycheck () {
    if (!(theKnight.isHittingTile(CollisionDirection.Bottom))) {
        while (!(theKnight.isHittingTile(CollisionDirection.Bottom))) {
            pause(100)
            theKnight.vy += 15
        }
        theKnight.vy = 0
        pause(100)
    }
}
// Pressing it more than once performs another jump immediately after touching the ground. Unclear why.
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    theKnight.vy = -120
    pause(100)
    gravitycheck()
})
// Freezes here. Don't know why.
function load_area (num: number) {
    tiles.setCurrentTilemap(Area_list[num])
    tiles.placeOnTile(theKnight, tiles.getTileLocation(0, 0))
    pause(100)
    gravitycheck()
}
// Nail slash.
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    player_NailSlash = sprites.create(assets.image`nail_hitbox`, SpriteKind.player_attack)
    player_NailSlash.setPosition(theKnight.x, theKnight.y)
    if (nail_direction == -1) {
        player_NailSlash.x += -15
        animation.runImageAnimation(
        player_NailSlash,
        assets.animation`swordslash_2`,
        20,
        false
        )
    } else if (nail_direction == 2) {
        player_NailSlash.y += -15
        animation.runImageAnimation(
        player_NailSlash,
        assets.animation`swordslash_0`,
        20,
        false
        )
    } else if (nail_direction == -2) {
        player_NailSlash.y += 15
        animation.runImageAnimation(
        player_NailSlash,
        assets.animation`swordslash_3`,
        20,
        false
        )
    } else {
        player_NailSlash.x += 10
        animation.runImageAnimation(
        player_NailSlash,
        assets.animation`swordslash_1`,
        20,
        false
        )
    }
    pause(500)
    player_NailSlash.destroy()
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    theKnight.setImage(assets.image`the_knight`)
    gravitycheck()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    nail_direction = -1
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprite.vx = sprite.vx * -1
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    nail_direction = 1
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (nail_direction == 1) {
        vengefulspirit = sprites.createProjectileFromSprite(assets.image`vengeful_spirit`, theKnight, 200, 0)
        vengefulspirit.setKind(SpriteKind.player_attack)
    } else if (nail_direction == -1) {
        vengefulspirit = sprites.createProjectileFromSprite(assets.image`vengeful_spirit0`, theKnight, -200, 0)
        vengefulspirit.setKind(SpriteKind.player_attack)
    }
})
scene.onOverlapTile(SpriteKind.player_attack, assets.tile`lifeblood_cocoon`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeLifeBy(1)
    for (let index = 0; index < randint(4, 10); index++) {
        FX = sprites.createProjectileFromSprite(assets.image`lifeblood_particle`, theKnight, randint(-100, 100), randint(-100, 100))
        tiles.placeOnTile(FX, location)
    }
})
sprites.onOverlap(SpriteKind.player_attack, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(5)
    for (let index = 0; index < randint(4, 10); index++) {
        FX = sprites.createProjectileFromSprite(assets.image`infection_particle`, otherSprite, randint(-100, 100), randint(-100, 100))
    }
    otherSprite.destroy()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    nail_direction = -2
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    info.changeLifeBy(-1)
    music.knock.play()
    spawnPlayer()
})
// I wish I knew an easier way to do this.
scene.onOverlapTile(SpriteKind.Player, assets.tile`msg_flag_1`, function (sprite, location) {
    game.showLongText("Higher beings, these words are for you alone.", DialogLayout.Top)
    game.showLongText("In this land you must brave your own battles.", DialogLayout.Top)
    game.showLongText("Draw your nail without fear, and you will survive. (Press A)", DialogLayout.Top)
    tiles.setTileAt(location, assets.tile`transparency16`)
    Summon_new(39, 24, "Crawlid")
})
scene.onOverlapTile(SpriteKind.player_attack, assets.tile`geo_cluster`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(10)
    for (let index = 0; index < randint(3, 6); index++) {
        FX = sprites.createProjectileFromSprite(assets.image`geoparticle`, theKnight, randint(-100, 100), randint(-100, 100))
        tiles.placeOnTile(FX, location)
    }
})
// Enemy spawn and behavior scripts
function Summon_new (x: number, y: number, enemy: string) {
    if (enemy == "Crawlid") {
        Crawlid = sprites.create(assets.image`crawlid_right`, SpriteKind.Enemy)
        tiles.placeOnTile(Crawlid, tiles.getTileLocation(x, y))
        Crawlid.setVelocity(20, 0)
    } else if (enemy == "Vengefly") {
        vengefly = sprites.create(assets.image`vengefly`, SpriteKind.Enemy)
        tiles.placeOnTile(vengefly, tiles.getTileLocation(x, y))
        vengefly.follow(theKnight, 50)
    } else {
    	
    }
}
// I wish I knew an easier way to do this.
scene.onOverlapTile(SpriteKind.Player, assets.tile`msg_flag_0`, function (sprite, location) {
    game.showLongText("Higher beings, these words are for you alone.", DialogLayout.Top)
    game.showLongText("Do not be afraid to accept assistance from others.", DialogLayout.Top)
    game.showLongText("To survive here, two must act as one. (Player 2, press RIGHT)", DialogLayout.Top)
    tiles.setTileAt(location, assets.tile`transparency16`)
    Summon_new(35, 44, "Vengefly")
    Summon_new(37, 43, "Vengefly")
})
// Benches are used as spawn points, but will not refill health unlike source material.
function spawnPlayer () {
    tiles.placeOnTile(theKnight, respawn)
}
scene.onHitWall(SpriteKind.player_attack, function (sprite, location) {
    if (sprite.tileKindAt(TileDirection.Left, assets.tile`fragile_wall_bluecracks`) || sprite.tileKindAt(TileDirection.Right, assets.tile`fragile_wall_bluecracks`)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        music.smallCrash.play()
        scene.cameraShake(5, 200)
        tiles.setWallAt(location, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`bench`, function (sprite, location) {
    respawn = location
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 200)
    sprite.startEffect(effects.spray, 200)
    pause(500)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    theKnight.setImage(assets.image`the_knight0`)
    gravitycheck()
})
let respawn: tiles.Location = null
let vengefly: Sprite = null
let Crawlid: Sprite = null
let FX: Sprite = null
let vengefulspirit: Sprite = null
let player_NailSlash: Sprite = null
let nail_direction = 0
let Area_list: tiles.TileMapData[] = []
let theKnight: Sprite = null
tiles.setCurrentTilemap(tilemap`kingspass`)
let area = 0
theKnight = sprites.create(assets.image`the_knight`, SpriteKind.Player)
info.setLife(4)
scene.cameraFollowSprite(theKnight)
tiles.placeOnTile(theKnight, tiles.getTileLocation(1, 1))
controller.moveSprite(theKnight, 100, 0)
game.showLongText("Higher beings, these words are for you alone.", DialogLayout.Top)
game.showLongText("Press B to ascend to greater heights.", DialogLayout.Top)
Area_list = [
tilemap`kingspass`,
tilemap`dirtmouth1`,
tilemap`dirtmouth1`,
tilemap`dirtmouth1`,
tilemap`dirtmouth1`,
tilemap`dirtmouth1`,
tilemap`dirtmouth1`
]
gravitycheck()
// Blackout crash on any attempt to move "gravitycheck" function into here. No known workarounds. Unclear why this happens.
game.onUpdate(function () {
	
})
