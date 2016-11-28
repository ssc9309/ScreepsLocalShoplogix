/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('controlModule'); // -> 'a thing'
 */
 
//ONLY WORKS FOR NEUTRAL CONTROLLERS. DAMNIT
module.exports = function(creep)
{
    creep.say("control");
    
    var controlFlag = Game.flags.controlFlag;
    
    //console.log(controlFlag.pos.roomName);

    
    if (controlFlag)
    {
        if (controlFlag.pos.roomName != creep.room.name)
        {
            creep.moveTo(controlFlag);
        }
        else
        {
            if (!creep.room.controller.my)
            {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
    
}