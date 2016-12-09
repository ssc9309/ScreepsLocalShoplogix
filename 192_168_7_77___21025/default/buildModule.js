/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('buildModule'); // -> 'a thing'
 */
var creep_getEnergy = require('creep_getEnergyModule');


module.exports = function (creep) 
{
    var workBodyCount = 0;
    for (var i in creep.body)
    {
        if (creep.body[i].type == WORK)
        {
            workBodyCount++;
        }
    }
       
    //creep.say("U"+creep.body.length/3);
    creep.say("B"+workBodyCount);
    
    if (Memory.creeps[creep.name].job == 'collect')
    {
        if(creep.carry.energy < creep.carryCapacity)// && Room.energyAvailable > 500)// && Game.spawns.Spawn1.energy > 200) 
    	{
    	    if (creep.room.energyAvailable >= 300)
    	    {
    	        creep_getEnergy(creep);
    	    }
    	}
    	else
    	{
    	    Memory.creeps[creep.name].job = 'build';
    	}
    }
	else 
	{
	    if (creep.carry.energy > 0)
	    {
	        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(target) 
            {
                if (creep.build(target) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target);
                }
                creep.say("Building");
            }
	    }
	    else
	    {
	        Memory.creeps[creep.name].job = 'collect';
	    }
	}
}