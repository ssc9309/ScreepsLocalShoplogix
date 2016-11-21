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
    
    if (controlFlag)
    {
        creep.moveTo(controlFlag);
    }
    else
    {
        if (!creep.room.controller.my)
        {
            creep.moveTo(creep.room.controller);
            var result = creep.claimController(creep.room.controller);
            creep.say(result);
        }
    }
    
}