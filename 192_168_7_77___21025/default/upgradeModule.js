/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('upgradeModule'); // -> 'a thing'
 */

 var creep_getEnergy = require('creep_getEnergyModule');
 
 module.exports = function (creep) {
       
    creep.say("U");

    //fill until full
    if (Memory.creeps[creep.name].job == 'collect')
    {
        if (creep.carry.energy < creep.carryCapacity)
        {
	        if (creep.room.energyAvailable >= 300)
    	    {
    	        creep_getEnergy(creep);
    	    }
        }
        else
        {
            Memory.creeps[creep.name].job = 'upgrade';
        }
    }
    else
    {
        if (creep.carry.energy > 0)
        {
            if(creep.room.controller) 
            {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else
        {
            Memory.creeps[creep.name].job = 'collect';
        }
    }
}