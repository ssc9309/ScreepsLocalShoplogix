/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvestor'); // -> 'a thing'
 */
 
 module.exports = function (creep, creepCount) {

    creep.say("M");
    
	if(creep.carry.energy < creep.carryCapacity) 
	//when it drops off at extension, it doesn't drop the whole thing.
	//so wait until it dropped everything to extention
	//if (creep.carry.energy < 50)
	{
		var sources = creep.room.find(FIND_SOURCES);
		
		//send 4 to sources 0,
		//rest to source 1
		if (creepCount <= 5)
		{
		    creep.moveTo(sources[0]);
		    creep.harvest(sources[0]);
		}
		else
		{
		    creep.moveTo(sources[1]);
		    creep.harvest(sources[1]);
		}
	}
	else 
	{
	    if (Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity)
	    {
		    creep.moveTo(Game.spawns.Spawn1);
		    creep.transferEnergy(Game.spawns.Spawn1)
	    }
	    else
	    {
	        var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, 
	        {
                filter: { structureType: STRUCTURE_EXTENSION }
            });
            
            for(var x in extensions)
            {
                var extension = extensions[x];
                if (extension.energy < extension.energyCapacity)
                {
                    creep.moveTo(extension);
		            creep.transferEnergy(extension);
                }
            }
            
	    }
	}
}