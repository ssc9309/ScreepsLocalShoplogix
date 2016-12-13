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

    if (creep.ticksToLive < 1400 && mySpawnInRoom.length > 0 && rallyFlag.room && rallyFlag.room.name == mySpawnInRoom[0].room.name)
    {
        //console.log(mySpawnInRoom[0].renewCreep(creep) );
        if(mySpawnInRoom[0].renewCreep(creep) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(mySpawnInRoom[0]);
        }
    }
    
    else if (damagedCreep)
    {
        if (creep.heal(damagedCreep) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(damagedCreep);
        }
    }
    else if (rallyFlag)
    {
        creep.moveTo(rallyFlag);
    }
};