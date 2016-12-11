module.exports = function(spawnName, buildingMaxHealthVar)
{
	console.log("---SpawnModule Start---");
	var startCPU = Game.cpu.getUsed();
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

    console.log("towerModules: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();

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

    console.log("linkModules: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();

    //kill off the lower level miner if the max can be built
    var minersVar = spawn.room.find(FIND_MY_CREEPS, 
    {
    	filter : function(object)
    	{
    		return object.memory.role == 'miner';
    	}
    });

    if (minersVar && minersVar.length >= spawn.room.memory.minerLimit)
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

    		if (workBodyCount < 6 && spawn.canCreateCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]) == OK)
    		{
    			minersVar[i].suicide();
    			break;
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
    	spawn.room.memory.buildingMaxHealth = 5000;
    	spawn.room.memory.wallRepairLimit = 0;
    	spawn.room.memory.rangeBuilderLimit = 0;
    	spawn.room.memory.linkX = -1;
    	spawn.room.memory.linkY = -1;
    	spawn.room.memory.rangeMinerLimit = 0;
    	spawn.room.memory.rangeTruckLimit = 0;
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
		if (spawn.room.memory.buildLimit <= 0)
		{
		    spawn.room.memory.buildLimit++;
		}
	}

	//if there is no building to be repaired, or we have a tower, then no repair creeps
	if (towers)
	{
		spawn.room.memory.repairLimit = 0;
	}
	else
	{
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

		if (!(repairBuildings[0]))
		{
			spawn.room.memory.repairLimit = 0;
		}
		else
		{
			spawn.room.memory.repairLimit = 1;
		}
	}

	//make transfer creep only if there is a storage and empty extentions
	var storageVar = spawn.room.storage;
	
	if (storageVar && storageVar.store[RESOURCE_ENERGY] > 0)
	{
		spawn.room.memory.transferLimit = 1;
	}
	else
	{
	    spawn.room.memory.transferLimit = 0;
	}

	//playing with upgrade limit 
	if (storageVar)
	{
		if (storageVar.store[RESOURCE_ENERGY] > storageVar.storeCapacity / 2)
		{
			if (spawn.room.memory.upgradeLimit == 1)
			{
				spawn.room.memory.upgradeLimit++;
			}
		}
		else if (storageVar.store[RESOURCE_ENERGY] <= 0)
		{
			if (spawn.room.memory.upgradeLimit > 1)
			{
				spawn.room.memory.upgradeLimit = 1;
			}
		}
		else
		{
			if (spawn.room.memory.upgradeLimit == 2)
			{
				spawn.room.memory.upgradeLimit--;
			}
		}
	}


	//change the range miner & truck number depending on the range flags
	spawn.room.memory.rangeMinerLimit = 0;
	spawn.room.memory.rangeTruckLimit = 0;
	for (var name in Game.flags)
	{
		var flagVar = Game.flags[name];
		if (flagVar.color == COLOR_YELLOW)
		{
			if (flagVar.memory.spawnRoom == spawn.room.name)
			{
				spawn.room.memory.rangeMinerLimit++;
				spawn.room.memory.rangeTruckLimit++;
			}
		}
	}

	console.log("Limit Fixing: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();


	//if it's not spawning, make sure spawn has all the creeps
	var keepUpCreepNumber = require('spawn_keepUpCreepNumber');

	if (!(spawn.spawning))
	{
		keepUpCreepNumber(spawn);
	}

	console.log("keepUpCreepNumberModule: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();
}
