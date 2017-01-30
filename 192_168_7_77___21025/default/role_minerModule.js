/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('minerModule'); // -> 'a thing'
 */
 
module.exports = function(creep)
{
    var workBodyCount = 0;
    for (var i in creep.body)
    {
        if (creep.body[i].type == WORK)
        {
            workBodyCount++;
        }
    }
    
    creep.say('M'+workBodyCount);

    //console.log(creep.memory.);
    //if no source id, assign myself one
    if (!creep.memory.sourceID)
    {

        var sources = creep.room.find(FIND_SOURCES);

        for (var i in sources)
        {

            var minersInRoom = creep.room.find(FIND_MY_CREEPS,
            {
                filter: function(object)
                {
                    return object.memory.role == 'miner' && 
                            object.memory.sourceID &&
                            object.memory.sourceID == sources[i].id;
                }
            });

            //console.log(minersInRoom <= 0);

            if (!minersInRoom || minersInRoom.length <= 0)
            {
                creep.memory.sourceID = sources[i].id;
                break;
            }
        }
    }
    else
    {
        //get rid of duplicate sourceID
        var minersInRoom = creep.room.find(FIND_MY_CREEPS,
        {
            filter: function(object)
            {
                return object.memory.role == 'miner' && 
                        object.memory.sourceID &&
                        object.memory.sourceID == creep.memory.sourceID &&
                        object.name != creep.name;
            }
        });
        //console.log(minersInRoom.length);
        if (minersInRoom.length > 0)
        {
            delete creep.memory.sourceID;
        }
        else
        {
            var source = Game.getObjectById(creep.memory.sourceID);

            if (creep.carry.energy >= creep.carryCapacity)
            {
                creep.drop(RESOURCE_ENERGY);
            }
            else
            {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(source);
                }
            }
        }
    }

     
     //creep.say(Memory.creeps[creep.name].role);
     
     /*
    var resources = creep.room.find(FIND_SOURCES);//[Memory.creeps[creep.name].number];
    //console.log(resources);
    
    //creep.say(Memory.creeps[creep.name].number);
    //creep.say()
    
    if (creep.carry.energy < creep.carryCapacity || creep.carry.energy == 0)
    {
        //creep.moveTo(resources[0]);
        if (creep.harvest(resources[Memory.creeps[creep.name].number]) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(resources[Memory.creeps[creep.name].number]);
        }
    }
    
    if (creep.carry.energy >= creep.carryCapacity)
    {
        creep.drop(RESOURCE_ENERGY);
    }
    */
    //else
    //{
        //creep.dropEnergy();
    //}
}