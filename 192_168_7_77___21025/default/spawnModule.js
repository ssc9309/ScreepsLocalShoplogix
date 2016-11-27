module.exports = function(spawnName, buildingMaxHealthVar)
{
	var spawn = Game.spawns[spawnName];
	
	var towerModule = require('towerModule');
    var towers = spawn.room.find(FIND_STRUCTURES, 
    {
        filter: 
        {
            structureType: STRUCTURE_TOWER, my: true
        }
    });
    
    towers.forEach(towerModule.run);

    var linkModule = require('linkModule');
    var links = spawn.room.find(FIND_MY_STRUCTURES,
    {
    	filter: {structureType: STRUCTURE_LINK}
    });

    //links.forEach(linkModule.run);
    for (var i in links)
    {
    	linkModule(links[i], spawn);
    }

    //kill off the lower level miner if the max can be built
    var minersVar = spawn.room.find(FIND_MY_CREEPS, 
    {
    	filter : function(object)
    	{
    		if(object.memory.role == 'miner')
    		{
    			return true;
    		}
    		return false;
    	}
    });

    if (minersVar)
    {
    	for (var i in minersVar)
    	{
    		var workBodyCount = 0;
    		for (var j in minersVar[i].body)
    		{
    			if (minersVar[i].body[j].type == WORK)
    			{
    				workBodyCount++;
    			}
    		}

    		if (workBodyCount < 6 && spawn.canCreateCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]))
    		{
    			minersVar[i].suicide();
    		}
    	}
    }

	//Set Default values
	//Reading the room creep limits from the memory
	if (spawn.room.memory.hello === undefined)
    {
    	spawn.room.memory.hello = "World";
    	spawn.room.memory.transferLimit = 1;
    	spawn.room.memory.truckLimit = 2;
    	spawn.room.memory.minerLimit = 2;
    	spawn.room.memory.buildLimit = 1;
    	spawn.room.memory.upgradeLimit = 1;
    	spawn.room.memory.armyLimit = 0;
    	spawn.room.memory.controlLimit = 0;
    	spawn.room.memory.repairLimit = 0;
    	spawn.room.memory.testLimit = 0;
    	spawn.room.memory.buildingMaxHealth = 300000;
    	spawn.room.memory.wallRepairLimit = 0;
    }

	//if there is no construction sites, no building units
	//console.log(Game.spawns[spawn].room);
	var constSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
	if (!(constSites[0]))
	{
		spawn.room.memory.buildLimit = 0;
	}
	else
	{
		spawn.room.memory.buildLimit = 1;
	}

	//if there is no building to be repaired, or we have a tower, then no repair creeps
	var repairBuildings = spawn.room.find(FIND_STRUCTURES, 
	{
	    filter : function(object)
	    {
	        if (object.hits >= object.hitsMax)
	        {
	            return false;
	        }
	        else if (object.hits >= spawn.room.memory.buildingMaxHealth)
	        {
	            return false;
	        }
	        else
	        {
	            return true;
	        }
	    }
	});
	
	if (!(repairBuildings[0]) || towers)
	{
		spawn.room.memory.repairLimit = 0;
	}
	else
	{
		spawn.room.memory.repairLimit = 1;
	}


	//make transfer creep only if there is a storage and empty extentions
	var storageBuildings = spawn.room.find(FIND_MY_STRUCTURES,
	{
	    filter: function(object)
	    {
	        return object.structureType == STRUCTURE_STORAGE && object.store[RESOURCE_ENERGY] > 0;
	    }
	});
	if (storageBuildings[0])
	{
		spawn.room.memory.transferLimit = 1;
	}
	else
	{
	    spawn.room.memory.transferLimit = 0;
	}

	//if it's not spawning, make sure spawn has all the creeps
	var keepUpCreepNumber = require('spawn_keepUpCreepNumber');

	if (!(spawn.spawning))
	{
		keepUpCreepNumber(spawn);
	}
}
