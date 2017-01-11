/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('healerModule');
 * mod.thing == 'a thing'; // true
 */

module.exports = function(creep)
{
    creep.say('H');
    
    var rallyFlag = Game.flags.rallyFlag;
    
    if (creep.room.controller && creep.room.controller.owner && !creep.room.controller.my && creep.room.controller.safeMode)
    {
        if (rallyFlag)
        {
            rallyFlag.setPosition(new RoomPosition(25, 25, creep.memory.spawnRoom));
        }
    }
    
    
    
    var damagedCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS,
    {
        filter: function(object)
        {
            return object.hits < object.hitsMax;
        }
    });
    
    var mySpawnInRoom = creep.room.find(FIND_MY_STRUCTURES,
    {
        filter: { structureType: STRUCTURE_SPAWN }
    });

    
    if (creep.memory.renew && mySpawnInRoom.length > 0 && rallyFlag.room && rallyFlag.room.name == creep.room.name && !damagedCreep)
    {
        var result = mySpawnInRoom[0].renewCreep(creep);
        
        if(result == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(mySpawnInRoom[0]);
        }
        else if (result == ERR_FULL || creep.ticksToLive > 1450)
        {
            creep.memory.renew = false;
        }
        
    }
    else if (creep.ticksToLive < 1000 && !creep.memory.renew)
    {
        creep.memory.renew = true;
        //console.log(mySpawnInRoom[0].renewCreep(creep) );
        //if(mySpawnInRoom[0].renewCreep(creep) == ERR_NOT_IN_RANGE)
        //{
            //creep.moveTo(mySpawnInRoom[0]);
        //}
    }
    else if (damagedCreep)
    {
        
        creep.moveTo(damagedCreep);
        if (creep.heal(damagedCreep) == ERR_NOT_IN_RANGE)
        {
            //creep.moveTo(damagedCreep);
        }
    }
    else if (rallyFlag)
    {
        creep.moveTo(rallyFlag);
    }
};