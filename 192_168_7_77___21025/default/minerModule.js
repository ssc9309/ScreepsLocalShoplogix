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
     
     //creep.say(Memory.creeps[creep.name].role);
     
    //if the miner does not have a resource number, assign an empty one
    if (Memory.creeps[creep.name].number != 0 && Memory.creeps[creep.name].number != 1)
    {
        //find the untaken resource and assign
        //var resourceZeroFound = false;
        //var resourceOneFound = false;
        
        var resourceZeroCounter = 0;
        var resourceOneCounter = 0;
        
        for (var name in Game.creeps)
        {
            if (Memory.creeps[name].role == 'miner')
            {
                if (Memory.creeps[name].number == 0)
                {
                    //resourceZeroFound = true;
                    resourceZeroCounter++;
                }
                else if (Memory.creeps[name].number == 1)
                {
                    //resourceOneFound = true;
                    resourceOneCounter++;
                }
            }
        }
        /*
        if(!resourceZeroFound)
        {
            Memory.creeps[creep.name].number = 0;
        }
        else if(!resourceOneFound)
        {
            Memory.creeps[creep.name].number = 1;
        }
        */
        /*
        if (resourceZeroCounter == 0)
        {
            Memory.creeps[creep.name].number = 0;
        }
        else if (resourceOneCounter == 0)
        {
            Memory.creeps[creep.name].number = 1;
        }
        */
        
        
        if (resourceZeroCounter <= resourceOneCounter)
        {
            Memory.creeps[creep.name].number = 0;
        }
        else
        {
            Memory.creeps[creep.name].number = 1;
        }
    }
    else
    {
        //sometimes two miners both go to the same mine. in this case, manually switch
        var resourceZeroCounter = 0;
        var resourceOneCounter = 0;
        
        for (var name in Game.creeps)
        {
            if (Memory.creeps[name].role == 'miner')
            {
                if (Memory.creeps[name].number == 0)
                {
                    resourceZeroCounter++;
                }
                else if (Memory.creeps[name].number == 1)
                {
                    resourceOneCounter++;
                }
            }
        }
        
        
        
        //if there is no minerZero and more than one minerOne, switch one of them to Zero
        if (resourceZeroCounter == 0 && resourceOneCounter > 1)
        {
            for (var name in Game.creeps)
            {
                if (Memory.creeps[name].role == 'miner')
                {
                    if (Memory.creeps[name].number == 1)
                    {
                        Memory.creeps[name].number = 0;
                        break;
                    }
                }
            }
        }
        //vice versa
        else if (resourceOneCounter == 0 && resourceZeroCounter > 1)
        {
            for (var name in Game.creeps)
            {
                if (Memory.creeps[name].role == 'miner')
                {
                    if (Memory.creeps[name].number == 0)
                    {
                        Memory.creeps[name].number = 1;
                        break;
                    }
                }
            }
        }
    }
    
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
    //else
    //{
        //creep.dropEnergy();
    //}
}