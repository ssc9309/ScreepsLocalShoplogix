module.exports = function(spawnName, buildingMaxHealthVar)
{
	var spawn = Game.spawns[spawnName];

	var transferModule = require('transferModule');
	var minerModule = require('minerModule');
	var truckModule = require('truckModule');
	var buildModule = require('buildModule');
	var upgradeModule = require('upgradeModule');
	var armyModule = require('armyModule');
	var controlModule = require('controlModule');
	var repairModule = require('repairModule');
	var testModule = require('testModule');
	var analysisModule = require('analysisModule');
	//analysisModule(Game.spawns.Spawn1);
	

	//Desired Population Number
	var transferLimit = 0;
	var minerLimit = 2;
	var truckLimit = 4;
	var buildLimit = 1;
	var upgradeLimit = 2;
	var armyLimit = 0;
	var controlLimit = 0;
	var repairLimit = 1;
	var testLimit = 0;

	//if there is no construction sites, no building units
	//console.log(Game.spawns[spawn].room);
	var constSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
	if (constSites[0])
	{
	}
	else
	{
	    buildLimit = 0;
	}

	//if there is no building to repair, no repair units
	var buildingMaxHealth = buildingMaxHealthVar;
	var repairBuildings = spawn.room.find(FIND_STRUCTURES, 
	{
	    filter : function(object)
	    {
	        if (object.hits >= object.hitsMax)
	        {
	            return false;
	        }
	        else if (object.hits >= buildingMaxHealth)
	        {
	            return false;
	        }
	        else
	        {
	            return true;
	        }
	    }
	});
	if (repairBuildings[0])
	{
	}
	else
	{
	    repairLimit = 0;
	}

	//make transfer creep only if there is a storage and empty extentions
	var storageBuildings = spawn.room.find(FIND_MY_STRUCTURES,
	{
	    filter: 
	    {
	        structureType: STRUCTURE_STORAGE
	    }
	});
	if (storageBuildings[0])
	{
	    var emptyExtentions = spawn.room.find(FIND_MY_STRUCTURES,
	    {
	        filter: function(object)
	        {
	            if (object.structureType == STRUCTURE_EXTENSION && object.energy < object.energyCapacity)
	            {
	                return true;
	            }
	            else
	            {
	                return false;
	            }
	        }
	    });
	    
	    if (emptyExtentions[0])
	    {
	        transferLimit = 1
	    }
	    else
	    {
	        transferLimit = 0;
	    }
	}
	else
	{
	    transferLimit = 0;
	}


	var transferCount = 0;
	var minerCount = 0;
	var truckCount = 0;
	var buildCount = 0;
	var upgradeCount = 0;
	var armyCount = 0;
	var controlCount = 0;
	var repairCount = 0;
	var testCount = 0;


	//Count all types of creeps
	for(var name in Game.creeps) {
	    
		//var creep = Game.creeps[name];
		if (Game.creeps[name].room.name != spawn.room.name)
		{
			continue;
		}
		
		var creepRole = Memory.creeps[name].role;

	    if (creepRole == 'transfer')
		{
		    transferCount++;
		}	
		else if (creepRole == 'miner')
		{
		    minerCount++;
		}
		//trucks only pick up from miner, not from ground
		else if (creepRole == 'truck')
		{
		    truckCount++;
		}
		else if (creepRole == 'build')
		{
		    buildCount++;
		}
		else if (creepRole == 'upgrade')
		{
		    upgradeCount++;
		}
		else if (creepRole == 'army')
		{
		    armyCount++;
		}
		else if (creepRole == 'control')
		{
		    controlCount++;
		}
		else if (creepRole == 'repair')
		{
		    repairCount++;
		}
		else if (creepRole == 'test')
		{
		    testCount++;
		}
	}

	//Game.creeps['Kayla'].say(buildCount);


	//create more creeps as needed


	var bodyCount = 1;

	//6 work parts actually can mine out
	//var minerBody = [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE];
	var minerBody = [MOVE, CARRY];

	//1 move necessary, work and carry scale

	var BuildingEnergy = spawn.room.energyAvailable;
	var isUnderEnergyLimit = true;

	//400 is the minimum amount needed to make a miner
	if (spawn.room.energyAvailable > 400)
	{
	    //BuildingEnergy = BuildingEnergy / 2;
	    //isUnderEnergyLimit = false;
	}
	//console.log(BuildingEnergy);

	var minerFactor = (BuildingEnergy - 100)/100;
	if (!isUnderEnergyLimit)
	{
	    minerFactor =  (BuildingEnergy*2 - 100)/100;
	}

	//var transferBody = [CARRY, MOVE];
	var transferBody = [];
	var transferFactor = BuildingEnergy / 100;

	//var truckBody = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
	var truckBody = [];
	var truckFactor = (BuildingEnergy) / 100;
	//var buildBody = [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
	var buildBody = [];
	var buildFactor = (BuildingEnergy) / 200;
	//var upgradeBody = [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
	var upgradeBody = [];
	var upgradeFactor = (BuildingEnergy) / 200;
	var armyBody = [ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
	var controlBody = [WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];

	var repairFactor = BuildingEnergy / 200;
	var repairBody = [];

	var testBody = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];


	//console.log(minerFactor);

	for (bodyCount = 1; bodyCount <= transferFactor; bodyCount++)
	{
	    transferBody.push(MOVE);
	    transferBody.push(CARRY);
	}
	for (bodyCount = 1; bodyCount <= minerFactor; bodyCount++)
	{
	    //source can only supply up to 5 working parts
	    //theoretically... but i'm gonna put 6 anyway
	    if (bodyCount > 6)
	    {
	        break;
	    }
	    minerBody.push(WORK);
	    //minerBody.push(CARRY);
	}
	for (bodyCount = 1; bodyCount <= truckFactor; bodyCount++)
	{
	    truckBody.push(MOVE);
	    truckBody.push(CARRY);
	}
	for (bodyCount = 1; bodyCount <= buildFactor; bodyCount++)
	{
	    buildBody.push(MOVE);
	    buildBody.push(CARRY);
	    buildBody.push(WORK);
	}
	for (bodyCount = 1; bodyCount <= upgradeFactor; bodyCount++)
	{
	    upgradeBody.push(MOVE);
	    upgradeBody.push(CARRY);
	    upgradeBody.push(WORK);
	}
	for (bodyCount = 1; bodyCount <= repairFactor; bodyCount++)
	{
	    repairBody.push(MOVE);
	    repairBody.push(CARRY);
	    repairBody.push(WORK);
	}

	//Emergency response. If all miners and trucks are dead, start using the storage
	/*
	if (minerCount == 0 && truckCount == 0)
	{
	    transferLimit = 1;
	}
	*/

	//console.log(minerCount);

	if (transferCount < transferLimit)
	{
	    var name = spawn.createCreep(transferBody);

	    if (name != -6 && name != -4)
	    {
	        Memory.creeps[name].role = 'transfer';
	        Memory.creeps[name].job = 'collect';
	    }
	}
	else if (minerCount == 0)
	{
	    //if for some reason there is no energy, make the basic creeps
	    /*
	    if (Game.spawns.Spawn1.room.energyAvailable <= 300)
	    {
	        minerBody = [WORK, CARRY, MOVE];
	    }
	    else
	    {
	        console.log(Game.spawns.Spawn1.room.energyAvailable);
	    }
	    */
	    
	    if (minerFactor >= 1)
	    {
	        var name = spawn.createCreep(minerBody);

	        if (name != -6 && name != -4)
	        {
	            Memory.creeps[name].role = 'miner';
	        }
	    }
	}
	else if (truckCount == 0)
	{
	    /*
	    if (Game.spawns.Spawn1.room.energyAvailable <= 300)
	    {
	        truckBody = [CARRY, MOVE];
	    }
	    */
	    
	    if (truckFactor >= 1)
	    {
		    var name = spawn.createCreep(truckBody);
		    
		    if (name != -6 && name != -4)
		    {
		        Memory.creeps[name].role = 'truck';
		        Memory.creeps[name].job = 'collect';
		    }
	    }
	}
	else if (minerCount < minerLimit)
	{
	    /*
	    if (Game.spawns.Spawn1.room.energyAvailable <= 300)
	    {
	        minerBody = [WORK, CARRY, MOVE];
	    }
	    
	    var name = Game.spawns.Spawn1.createCreep(minerBody);
	    if (name != -6 && name != -4)
	    {
	        Memory.creeps[name].role = 'miner';
	    }
	    */
	    
	    if (minerFactor >= 1)
	    {
	        //console.log("Creating miner");
	        //console.log(minerFactor);
	        var name = spawn.createCreep(minerBody);

	        if (name != -6 && name != -4)
	        {
	            Memory.creeps[name].role = 'miner';
	        }
	    }
	}
	else if (truckCount < truckLimit)
	{
	    /*
	    if (Game.spawns.Spawn1.room.energyAvailable <= 300)
	    {
	        truckBody = [CARRY, MOVE];
	    }
	    */
	    
	    if(truckFactor >= 1)
	    {
	    
	        var name = spawn.createCreep(truckBody);
	        if (name != -6 && name != -4)
	        {
	            Memory.creeps[name].role = 'truck';
	            Memory.creeps[name].job = 'collect';
	        }
	    }
	}
	else if (buildCount < buildLimit)
	{
	    //console.log(buildCount);
	    /*
	    if (Game.spawns.Spawn1.room.energyAvailable < 300)
	    {
	        buildBody = [WORK, CARRY, MOVE];
	    }
	    */
	    
	    if (buildFactor >= 1)
	    {
	        var name = spawn.createCreep(buildBody);
	    
	        if (name != -6 && name != -4)
	        {
	            Memory.creeps[name].role = 'build';
	        }
	    }
	}
	else if (upgradeCount < upgradeLimit)
	{
	    /*
	    if (Game.spawns.Spawn1.room.energyAvailable < 300)
	    {
	        upgradeBody = [WORK, CARRY, MOVE];
	    }
	    */
	    
	    if (upgradeFactor >= 1)
	    {
	        var name = spawn.createCreep(upgradeBody);
	        if (name != -6 && name != -4)
	        {
	            Memory.creeps[name].role = 'upgrade';
	            Memory.creeps[name].job = 'collect';
	        }
	    }
	}
	else if (armyCount < armyLimit)
	{
	    if (spawn.room.energyAvailable < 300)
	    {
	        armyBody = [ATTACK, TOUGH, MOVE];
	    }
	    
	    var name = spawn.createCreep(armyBody);

	    if (name != -6 && name != -4)
	    {
	        Memory.creeps[name].role = 'army';
	    }
	}
	else if (controlCount < controlLimit)
	{
	    //console.log("Are you trying to control?");
	    var name = spawn.createCreep(controlBody);

	    if (name != -6 && name != -4)
	    {
	        Memory.creeps[name].role = 'control';
	    }
	}
	else if (repairCount < repairLimit && repairFactor >= 1)
	{
	    //console.log("Are you trying to repair?");
	    var name = spawn.createCreep(repairBody);
	    //console.log(repairBody);
	    if(name != -6 && name != -4)
	    {
	        Memory.creeps[name].role = 'repair';
	    }
	}
	else if (testCount < testLimit)
	{
	    //console.log("Are you trying to test?");
	    var name = spawn.createCreep(testBody);

	    if (name != -6 && name != -4)
	    {
	        Memory.creeps[name].role = 'test';
	    }
	}	
}