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
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    gravitycheck()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    info.changeLifeBy(-1)
    spawnPlayer()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`msg_flag_1`, function (sprite, location) {
    game.showLongText("Higher beings, these words are for you alone.", DialogLayout.Top)
    game.showLongText("In this land you must brave your own battles.", DialogLayout.Top)
    game.showLongText("Draw your nail without fear, and you will survive. (Press A)", DialogLayout.Top)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
// Benches are used as spawn points, but will not refill health unlike source material.
function spawnPlayer () {
    tiles.placeOnRandomTile(theKnight, assets.tile`bench`)
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    gravitycheck()
})
let theKnight: Sprite = null
tiles.setCurrentTilemap(tilemap`crossroads-1`)
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
