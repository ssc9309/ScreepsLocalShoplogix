/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn_initializeMemory');
 * mod.thing == 'a thing'; // true
 */

module.exports = function(spawn)
{
    var spawnMemory = spawn.room.memory;
    
    if (spawnMemory.hello === undefined)
    {
    	spawnMemory.hello = "World";
    }
    if (spawnMemory.transferLimit === undefined)
    {
    	spawnMemory.transferLimit = 1;
    }
    if (spawnMemory.minerLimit === undefined)
    {
        spawnMemory.minerLimit = spawn.room.find(FIND_SOURCES).length;
    }
    if (spawnMemory.truckLimit === undefined)
    {
        spawnMemory.truckLimit = spawnMemory.minerLimit;
    }
    if (spawnMemory.buildLimit === undefined)
    {
        spawnMemory.buildLimit = 1;
    }
    if (spawnMemory.upgradeLimit === undefined)
    {
        //change depending on the storage energy
        spawnMemory.upgradeLimit = 1;
    }
    if (spawnMemory.armyLimit === undefined)
    {
        //go up if enemy is found
        spawnMemory.armyLimit = 0;
    }
    if (spawnMemory.controlLimit === undefined)
    {
        spawnMemory.controlLimit = 0;
    }
    if (spawnMemory.repairLimit === undefined)
    {
        spawnMemory.repairLimit = 0;
    }
    if (spawnMemory.testLimit === undefined)
    {
        spawnMemory.testLimit = 0;
    }
    if (spawnMemory.buildingMaxHealth === undefined)
    {
        spawnMemory.buildingMaxHealth = 5000;
    }
    if (spawnMemory.rangeBuilderLimit === undefined)
    {
        spawnMemory.rangeBuilderLimit = 0;
    }
    if (spawnMemory.linkX === undefined)
    {
        spawnMemory.linkX = -1;
    }
    if (spawnMemory.linkY === undefined)
    {
        spawnMemory.linkY = -1;
    }
    if (spawnMemory.rangeMinerLimit === undefined)
    {
        spawnMemory.rangeMinerLimit = 0;
    }
    if (spawnMemory.rangeTruckLimit === undefined)
    {
        spawnMemory.rangeTruckLimit = 0;
    }
    if (spawnMemory.healerLimit === undefined)
    {
        spawnMemory.healerLimit = 0;
    }
    if (spawnMemory.mineralHarvesterLimit === undefined)
    {
        spawnMemory.mineralHarvesterLimit = 0;
    }
    if (spawnMemory.fastCatLimit === undefined)
    {
        spawnMemory.fastCatLimit = 0;
    }
    if (spawnMemory.mineralTransferLimit === undefined)
    {
        spawnMemory.mineralTransferLimit = 0;
    }
    
    //delete spawnMemory.mineralTransfer;

    //if there is no construction sites, no building units
    //console.log(Game.spawns[spawn].room);
    var constSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
    if (constSites.length <= 0)
    {
        spawnMemory.buildLimit = 0;
    }
    else
    {
        if (spawnMemory.buildLimit <= 0)
        {
            spawnMemory.buildLimit++;
        }
    }

    //if there is no building to be repaired, or we have a tower, then no repair creeps

    var towers = spawn.room.find(FIND_STRUCTURES, 
    {
        filter: 
        {
            structureType: STRUCTURE_TOWER, my: true
        }
    });

    if (towers)
    {
        spawnMemory.repairLimit = 0;
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
                else if (object.hits >= spawnMemory.buildingMaxHealth)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        });

        if (repairBuildings.length <= 0)
        {
            spawnMemory.repairLimit = 0;
        }
        else
        {
            spawnMemory.repairLimit = 1;
        }
    }

    //make transfer creep only if there is a storage and empty extentions
    var storageVar = spawn.room.storage;
    
    if (storageVar && storageVar.store[RESOURCE_ENERGY] > 0)
    {
        spawnMemory.transferLimit = 1;
    }
    else
    {
        spawnMemory.transferLimit = 0;
    }

    //playing with upgrade limit 
    if (storageVar)
    {
        if (storageVar.store[RESOURCE_ENERGY] > storageVar.storeCapacity * 0.75)
        {
            spawnMemory.upgradeLimit = 5;
        }
        else if (storageVar.store[RESOURCE_ENERGY] > storageVar.storeCapacity / 2)
        {
            if (spawnMemory.upgradeLimit == 1)
            {
                spawnMemory.upgradeLimit++;
            }
        }
        else if (storageVar.store[RESOURCE_ENERGY] <= 0)
        {
            if (spawnMemory.upgradeLimit > 1)
            {
                spawnMemory.upgradeLimit = 1;
            }
        }
        else
        {
            if (spawnMemory.upgradeLimit == 2)
            {
                spawnMemory.upgradeLimit--;
            }
        }
    }


    //change the range miner & truck number depending on the range flags
    spawnMemory.rangeMinerLimit = 0;
    spawnMemory.rangeTruckLimit = 0;
    if (storageVar)
    {
        for (var name in Game.flags)
        {
            var flagVar = Game.flags[name];
            if (flagVar.color == COLOR_YELLOW)
            {
                if (flagVar.memory.spawnRoom == spawn.room.name)
                {
                    spawnMemory.rangeMinerLimit++;
                    spawnMemory.rangeTruckLimit++;
                }
            }
        }
    }


    var mineralVar = spawn.room.find(FIND_MINERALS)[0];
    var extractorVar = spawn.room.find(FIND_MY_STRUCTURES, 
    {
        filter : function(object)
        {
            return object.structureType == STRUCTURE_EXTRACTOR;
        }
    });
    var terminalVar = spawn.room.terminal;
    if (spawn.room.name == 'W8N8')
    {
        //console.log(terminalVar.store[RESOURCE_ZYNTHIUM]);
        //console.log(mineralVar.mineralType);
        //console.log(RESOURCE_ZYNTHIUM);
        //console.log(RESOURCE_ENERGY);
    }
    /*
    if (spawn.room.name == 'W8N8')
    {
        console.log(terminalVar && (!terminalVar.store[mineralVar.mineralType] || terminalVar.store[mineralVar.mineralType] < terminalVar.storeCapacity / 4));
    }
    */
    //console.log(terminalVar.store[mineralVar.mineralType] < terminalVar.storeCapacity / 4); 

    //hank, figure out how to store more minerals
    if ((mineralVar.mineralType == RESOURCE_KEANIUM || mineralVar.mineralType == RESOURCE_LEMERGIUM || mineralVar.mineralType == RESOURCE_ZYNTHIUM || mineralVar.mineralType == RESOURCE_UTRIUM) && 
        extractorVar.length > 0 &&
        mineralVar.mineralAmount > 0 &&
        terminalVar)// && (!terminalVar.store[mineralVar.mineralType] || terminalVar.store[mineralVar.mineralType] < terminalVar.storeCapacity / 4))
    {
        spawnMemory.mineralHarvesterLimit = 1;
    }
    else
    {
        spawnMemory.mineralHarvesterLimit = 0;
    }
    
    //hank, this is hardcoded for shoplogix game only...
    if (spawn.room.name == 'W8N8')
    {
        if (terminalVar && _.sum(terminalVar.store) > 0)
        {
            spawnMemory.mineralTransferLimit = 1;
        }
        else
        {
            spawnMemory.mineralTransferLimit = 0;
        }
    }

    //console.log(spawn.room.find(FIND_MINERALS)[0].density);
    //mineralHarvesterCount
};