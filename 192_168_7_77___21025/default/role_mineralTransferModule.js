/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role_mineralTransferModule');
 * mod.thing == 'a thing'; // true
 */

module.exports = function(creep)
{
    creep.say("MT");
    
    var terminalVar = creep.room.terminal;
    
	/*
    var labs = creep.room.find(FIND_MY_STRUCTURES,
	{
		filter: function(object)
		{
			return object.structureType == STRUCTURE_LAB;
		}
	});
	*/
	
	//yea yea, hardcode, i know. now shut up
	var lab0 = Game.getObjectById('73506e7007ee130');
	var lab1 = Game.getObjectById('bcddcde4ea3567f');
	var lab2 = Game.getObjectById('3fab9357ddfd192');
	var lab3 = Game.getObjectById('f4b1e1f8c783a49');
	//73506e7007ee130
	//bcddcde4ea3567f
	//3fab9357ddfd192
	//f4b1e1f8c783a49
	//0fd5d18db0e415c
	//e239d972de9f63e
    
    if (terminalVar)// && labs.length > 5)
    {
    	var terminalResourceType = '';

    	if (terminalVar.store[RESOURCE_ZYNTHIUM] > 0 && lab0.mineralAmount < lab0.mineralCapacity)
    	{
    		terminalResourceType = RESOURCE_ZYNTHIUM;
    	}
    	else if (terminalVar.store[RESOURCE_UTRIUM] > 0 && lab1.mineralAmount < lab1.mineralCapacity)
    	{
            terminalResourceType = RESOURCE_UTRIUM;
        }
        else if (terminalVar.store[RESOURCE_LEMERGIUM] > 0 && lab2.mineralAmount < lab2.mineralCapacity)
    	{
            terminalResourceType = RESOURCE_LEMERGIUM;
        }
        else if (terminalVar.store[RESOURCE_KEANIUM] > 0 && lab3.mineralAmount < lab3.mineralCapacity)
    	{
            terminalResourceType = RESOURCE_KEANIUM;
        }

        if (_.sum(creep.carry) <= 0)
        {
    		if (creep.withdraw(terminalVar, terminalResourceType) == ERR_NOT_IN_RANGE)
            {
            	creep.moveTo(terminalVar);
            }
        }
        else
        {
    		if (creep.carry[RESOURCE_ZYNTHIUM] > 0)
    		{
    			if (lab0.mineralAmount >= lab0.mineralCapacity)
    			{
    				if (creep.transfer(terminalVar, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE)
	    			{
	    				creep.moveTo(terminalVar);
	    			}
    			}
    			else
    			{
	    			if (creep.transfer(lab0, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE)
	    			{
	    				creep.moveTo(lab0);
	    			}
	    		}
    		}
    		else if (creep.carry[RESOURCE_UTRIUM] > 0)
    		{
    			if (lab1.mineralAmount >= lab1.mineralCapacity)
    			{
    				if (creep.transfer(terminalVar, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE)
	    			{
	    				creep.moveTo(terminalVar);
	    			}
    			}
    			else
    			{
	    			if (creep.transfer(lab1, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE)
	    			{
	    				creep.moveTo(lab1);
	    			}
	    		}
    		}
    		else if (creep.carry[RESOURCE_LEMERGIUM] > 0)
    		{
    			if (lab2.mineralAmount >= lab2.mineralCapacity)
    			{
    				if (creep.transfer(terminalVar, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE)
	    			{
	    				creep.moveTo(terminalVar);
	    			}
    			}
    			else
    			{
	    			if (creep.transfer(lab2, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE)
	    			{
	    				creep.moveTo(lab2);
	    			}
	    		}
    		}
    		else if (creep.carry[RESOURCE_KEANIUM] > 0)
    		{
    			if (lab3.mineralAmount >= lab3.mineralCapacity)
    			{
    				if (creep.transfer(terminalVar, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE)
	    			{
	    				creep.moveTo(terminalVar);
	    			}
    			}
    			else
    			{
	    			if (creep.transfer(lab3, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE)
	    			{
	    				creep.moveTo(lab3);
	    			}
	    		}
    		}
        }
    }
};