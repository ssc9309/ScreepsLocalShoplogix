

module.exports = function(spawn)
{
    var creepLimitModule = require('spawn_calculateCreepLimit');
	//var creepsOfSpawn = [];

	var transferCount = 0;
	var minerCount = 0;
	var truckCount = 0;
	var buildCount = 0;
	var upgradeCount = 0;
	var armyCount = 0;
	var controlCount = 0;
	var repairCount = 0;
	var testCount = 0;
	var rangeBuilderCount = 0;
	var rangeMinerCount = 0;
	var rangeTruckCount = 0;
	var healerCount = 0;
	var tankCount = 0;
	var fastCatCount = 0;
	var safeModeCheckerCount = 0;
	var mineralHarvesterCount = 0;
	var mineralTransferCount = 0;

	var bodyTypeToMake = '';
	var body = [];

	for(var name in Game.creeps)
	{
		var creepVar = Game.creeps[name];

		if (creepVar.memory.spawnRoom == spawn.room.name)
		{
			var creepRole = creepVar.memory.role;
			//console.log(creepRole);

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
			else if (creepRole == 'rangeBuilder')
			{
			    rangeBuilderCount++;
			}
			else if (creepRole == 'rangeMiner')
			{
				rangeMinerCount++;
			}
			else if (creepRole == 'rangeTruck')
			{
				rangeTruckCount++;
			}
			else if (creepRole == 'healer')
			{
			    healerCount++;
			}
			else if (creepRole == 'tank')
			{
			    tankCount++;
			}
			else if (creepRole == 'fastCat')
			{
			    fastCatCount++;
			}
			else if (creepRole == 'safeModeChecker')
			{
			    safeModeCheckerCount++;
			}
			else if (creepRole == 'mineralHarvester')
			{
			    mineralHarvesterCount++;
			}
			else if (creepRole == 'mineralTransfer')
			{
			    mineralTransferCount++;
			}
		}
	}

	//console.log(spawn.room.memory.truckLimit);
	
	creepLimitModule(spawn);

	var spawnMemory = spawn.room.memory;
	//console.log(transferCount);

	//this is priority list. IT DICTATES WHICH ONE TO BUILD FIRST
	if (transferCount < spawnMemory.transferLimit)
	{
		bodyTypeToMake = 'transfer';
	}
	else if (minerCount < spawnMemory.minerLimit)
	{
		bodyTypeToMake = 'miner';
	}
	else if (truckCount < spawnMemory.truckLimit)
	{
		bodyTypeToMake = 'truck';
	}
	else if (buildCount < spawnMemory.buildLimit)
	{
		bodyTypeToMake = 'build';
	}
	else if (upgradeCount < spawnMemory.upgradeLimit)
	{
		//Hank. 20 upgrade parts = 2 max resource mining
		bodyTypeToMake = 'upgrade';
	}
	else if (mineralHarvesterCount < spawnMemory.mineralHarvesterLimit)
	{
		bodyTypeToMake = 'mineralHarvester';
	}
	else if (mineralTransferCount < spawnMemory.mineralTransferLimit)
	{
	    bodyTypeToMake = 'mineralTransfer';
	}
	else if (repairCount < spawnMemory.repairLimit)
	{
		bodyTypeToMake = 'repair';
	}
	else if (fastCatCount < spawnMemory.fastCatLimit)
	{
	    bodyTypeToMake = 'fastCat';
	}
	else if (armyCount < spawnMemory.armyLimit)
	{
		bodyTypeToMake = 'army';
	}
	else if (controlCount < spawnMemory.controlLimit)
	{
		bodyTypeToMake = 'control';
	}
	else if (rangeBuilderCount < spawnMemory.rangeBuilderLimit)
	{
		bodyTypeToMake = 'rangeBuilder';
	}
	else if (rangeMinerCount < spawnMemory.rangeMinerLimit)
	{
		bodyTypeToMake = 'rangeMiner';
	}
	else if (rangeTruckCount < spawnMemory.rangeTruckLimit)
	{
		bodyTypeToMake = 'rangeTruck';
	}
	else if (healerCount < spawnMemory.healerLimit)
	{
	    bodyTypeToMake = 'healer';
	}
	else if (tankCount < spawnMemory.tankLimit)
	{
	    bodyTypeToMake = 'tank';
	}
	else if (safeModeCheckerCount < spawnMemory.safeModeCheckerLimit && Game.time >= spawnMemory.safeModeEndsAt)
	{
	    bodyTypeToMake = 'safeModeChecker';
	}


	//console.log(bodyTypeToMake);
	if (bodyTypeToMake != '')
	{
		var availableEnergy = spawn.room.energyAvailable;
		var energyCapacity = spawn.room.energyCapacityAvailable;
		var prevBody = [];

		do
		{
			//wow i learned something
			// = will reference. if the original is changed, so will the copy
			// _.clone() will take the value
			prevBody = _.clone(body);

			if (bodyTypeToMake == 'truck' || bodyTypeToMake == 'transfer' || bodyTypeToMake == 'mineralTransfer')
			{	
				body.push(MOVE);
				body.push(CARRY);
			}
			else if(bodyTypeToMake == 'miner')
			{
				if (body.length == 0)
				{
					body.push(WORK, MOVE, CARRY);
				}
				else
				{
					//if max miner body is approved, stop
					if (body.length >= 8)
					{
						break;
					}
					else
					{
						body.push(WORK)
					}
				}
			}
			else if (	bodyTypeToMake == 'build' || 
						bodyTypeToMake == 'upgrade' || 
						bodyTypeToMake == 'repair' ||
						bodyTypeToMake == 'rangeBuilder' ||
						bodyTypeToMake == 'mineralHarvester')
			{
				body.push(MOVE);
				body.push(CARRY);
				body.push(WORK);
				
				if (bodyTypeToMake == 'upgrade' && spawn.room.controller.level >= 8)
				{
				    if (body.length > 3)
				    {
				        break;
				    }
				}
			}
			else if (bodyTypeToMake == 'army')
			{
				//body.push(TOUGH);
				body.push(RANGED_ATTACK);
				body.push(MOVE);
			}
			else if (bodyTypeToMake == 'control')
			{
			    if (body.length > 6)
				{
				    break;
				}
				else if(body.length == 0)
				{
					body.push(CLAIM);
					body.push(MOVE);
				}
				else
				{
					body.push(MOVE);
				}
				
			}
			else if (bodyTypeToMake == 'rangeMiner')
			{
				if (body.length == 0)
				{
					body.push(WORK);
					body.push(MOVE);
					body.push(CARRY);
				}
				else if (body.length < 7)
				{
					body.push(WORK);
					body.push(MOVE);
				}
				else
				{
					body.push(MOVE);
					//fatigue. 
					//pretty much one move per other for plain
					//half per other for non move
					//5 times per other for swamp
					//if work, carry, move.
					//fine for road
					//every 2 ticks for plain
					//some more for swamp
					
					//fuck. emtpy carry is not counted either...
					if (body.length > 7)
					{
					    break;
					}
				}
			}
			else if (bodyTypeToMake == 'healer')
			{
			    //body.push(TOUGH);
				body.push(HEAL);
				//body.push(MOVE);
				body.push(MOVE);
			}
			else if (bodyTypeToMake == 'tank')
			{
			    if (body.length <= 0)
			    {
			        body.push(RANGED_ATTACK);
			        body.push(TOUGH);
			        body.push(MOVE);
			        body.push(MOVE);
			    }
			    else
			    {
			        body.push(TOUGH);
			        body.push(MOVE);
			    }
			}
			else if (bodyTypeToMake == 'fastCat')
			{
			    //body.push(RANGED_ATTACK);
			    body.push(ATTACK);
			    body.push(MOVE);
			    body.push(MOVE);
			    body.push(MOVE);
			    body.push(MOVE);
			    body.push(MOVE);
			}
			else if (bodyTypeToMake == 'rangeTruck')
			{
			    if (body.length <= 0)
			    {
			        body.push(WORK);
			        body.push(CARRY);
			        body.push(MOVE);
			        body.push(MOVE);
			    }
			    else
			    {
			        body.push(CARRY);
			        body.push(MOVE);
			    }
			}
			else if (bodyTypeToMake == 'safeModeChecker')
			{
		        body.push(MOVE);
		        if (body.length > 1)
		        {
		            break;
		        }
			}
		}while(spawn.canCreateCreep(body) == OK);

		body = _.clone(prevBody);

		body.sort();
		body.reverse();

		//console.log(body);

		if (body.length > 0)
		{
			if (bodyTypeToMake == 'truck' || bodyTypeToMake == 'miner')
			{
				var existingCreeps = spawn.room.find(FIND_MY_CREEPS,
				{
					filter: function(object)
					{
						return object.memory.role == bodyTypeToMake && object.memory.number == 0;
					}
				});
				
				if (existingCreeps.length <= 0)
				{
					spawn.createCreep(body, null, { role: bodyTypeToMake, spawnRoom: spawn.room.name, number: 0 });
				}
				else
				{
					spawn.createCreep(body, null, { role: bodyTypeToMake, spawnRoom: spawn.room.name, number: spawn.room.find(FIND_SOURCES).length-1 });
				}
			}
			else
			{
				spawn.createCreep(body, null, { role: bodyTypeToMake, spawnRoom: spawn.room.name});
			}
		}
	}
}