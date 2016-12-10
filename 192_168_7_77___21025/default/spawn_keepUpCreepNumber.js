module.exports = function(spawn)
{
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
		}
	}

	//console.log(spawn.room.memory.truckLimit);

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
	else if (repairCount < spawnMemory.repairLimit)
	{
		bodyTypeToMake = 'repair';
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

			if (bodyTypeToMake == 'truck' || bodyTypeToMake == 'transfer')
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
						bodyTypeToMake == 'rangeBuilder')
			{
				body.push(MOVE);
				body.push(CARRY);
				body.push(WORK);
			}
			else if (bodyTypeToMake == 'army')
			{
				body.push(TOUGH);
				body.push(RANGED_ATTACK);
				body.push(MOVE);
			}
			else if (bodyTypeToMake == 'control')
			{
				if(body.length == 0)
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