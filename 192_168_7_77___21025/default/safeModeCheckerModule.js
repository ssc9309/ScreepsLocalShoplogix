/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('safeModeCheckerModule');
 * mod.thing == 'a thing'; // true
 */

module.exports = function(creep)
{
    creep.say("SMC");
    
    var safeModeFlag = Game.flags.safeModeCheckFlag;
    var rallyFlag = Game.flags.rallyFlag;
    
    if (safeModeFlag)
    {
        //if not in the room, go to the flag
        if (!safeModeFlag.room || safeModeFlag.room.name != creep.room.name)
        {
            creep.moveTo(safeModeFlag);
        }
        //if in the room, check the status
        else
        {
            if (creep.room.controller.owner)
            {
                //if the room is still owned and safeMode is on, then run back to spawn
                if (creep.room.controller.safeMode)
                {
                    creep.moveTo(Game.rooms[creep.memory.spawnRoom].controller);
                    Game.rooms[creep.memory.spawnRoom].memory.safeModeLastChecked = Game.time;
                    Game.rooms[creep.memory.spawnRoom].memory.safeModeEndsAt = Game.time + creep.room.controller.safeMode;
                }
                //if the safe mode is down, then rally it up.
                else
                {
                    rallyFlag.setPosition(new RoomPosition(creep.room.controller.pos.x, creep.room.controller.pos.y, creep.room.name));
                }
            }
            else
            {
                //then why do i exist?
                safeModeFlag.remove();
                Game.rooms[creep.memory.spawnRoom].memory.safeModeCheckerLimit = 0;
            }
        }
    }
    else
    {
        Game.rooms[creep.memory.spawnRoom].memory.safeModeCheckerLimit = 0;
    }
};