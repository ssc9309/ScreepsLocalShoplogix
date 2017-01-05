/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('upgradeModule'); // -> 'a thing'
 */

 var creep_getEnergy = require('creep_getEnergyModule');
 
 module.exports = function (creep) {
       
    var workBodyCount = 0;
    for (var i in creep.body)
    {
        if (creep.body[i].type == WORK)
        {
            workBodyCount++;
        }
    }

    creep.say("U"+workBodyCount);

    //if it has no job assigned, then collect;
    if (creep.memory.job)
    {
    }
    else
    {
        creep.memory.job = 'collect';
    }

    //fill until full
    if (Memory.creeps[creep.name].job == 'collect')
    {
        if (creep.carry.energy < creep.carryCapacity)
        {
	        if (creep.room.energyAvailable >= 300)
    	    {
                var targetExt = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: function(object)
                    {
                        return object.structureType == STRUCTURE_LINK && (object.energy > 0);
                    }
                });

                if (targetExt)
                {
                    if (creep.withdraw(targetExt, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetExt);
                    }
                }
                else
                {
        	        creep_getEnergy(creep);
                }
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