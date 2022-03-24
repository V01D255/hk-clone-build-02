namespace SpriteKind {
    export const player_attack = SpriteKind.create()
}
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
})
// I wish I knew an easier way to do this.
scene.onOverlapTile(SpriteKind.Player, assets.tile`msg_flag_0`, function (sprite, location) {
    game.showLongText("Higher beings, these words are for you alone.", DialogLayout.Top)
    game.showLongText("Do not be afraid to accept assistance from others.", DialogLayout.Top)
    game.showLongText("To survive here, two must act as one. (Player 2, press RIGHT)", DialogLayout.Top)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
// Benches are used as spawn points, but will not refill health unlike source material.
function spawnPlayer () {
    tiles.placeOnRandomTile(theKnight, assets.tile`bench`)
}
scene.onHitWall(SpriteKind.player_attack, function (sprite, location) {
    if (sprite.tileKindAt(TileDirection.Left, assets.tile`fragile_wall_bluecracks`) || sprite.tileKindAt(TileDirection.Right, assets.tile`fragile_wall_bluecracks`)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        music.smallCrash.play()
        tiles.setWallAt(location, false)
    }
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    theKnight.setImage(assets.image`the_knight0`)
    gravitycheck()
})
let vengefulspirit: Sprite = null
let player_NailSlash: Sprite = null
let nail_direction = 0
let theKnight: Sprite = null
tiles.setCurrentTilemap(tilemap`kingspass`)
theKnight = sprites.create(assets.image`the_knight`, SpriteKind.Player)
info.setLife(4)
scene.cameraFollowSprite(theKnight)
spawnPlayer()
controller.moveSprite(theKnight, 100, 0)
game.showLongText("Higher beings, these words are for you alone.", DialogLayout.Top)
game.showLongText("Press B to ascend to greater heights.", DialogLayout.Top)
// Blackout crash on any attempt to move "gravitycheck" function into here. No known workarounds. Unclear why this happens.
game.onUpdate(function () {
	
})
