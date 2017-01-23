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
    var storageVar = creep.room.storage;
    
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
	var lab4 = Game.getObjectById('0fd5d18db0e415c');
	var lab5 = Game.getObjectById('e239d972de9f63e');
	var lab6 = Game.getObjectById('2b97a1d8e4ea6aa');
	var lab7 = Game.getObjectById('5b58b90b92d39a5');
	var lab8 = Game.getObjectById('03bfae65d8dbef0');

	//73506e7007ee130
	//bcddcde4ea3567f
	//3fab9357ddfd192
	//f4b1e1f8c783a49
	//0fd5d18db0e415c
	//e239d972de9f63e
	//2b97a1d8e4ea6aa
	//5b58b90b92d39a5
	//03bfae65d8dbef0
    
    //if (terminalVar)// && labs.length > 5)
    /*

    if (_.sum(creep.carry) <= 0)
    {
    	creep.withdraw(lab2, RESOURCE_ZYNTHIUM);
    	creep.moveTo(lab2);
    }
    else
    {
    	creep.transfer(terminalVar, RESOURCE_ZYNTHIUM);
    	creep.moveTo(terminalVar);
    }
	*/
    

    if (terminalVar)
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

        if (terminalResourceType == '')
        {
        	//console.log(storageVar.store[RESOURCE_ENERGY] > storageVar.storeCapacity / 2);
        	if (storageVar && storageVar.store[RESOURCE_ENERGY] > storageVar.storeCapacity / 2 && terminalVar.store[RESOURCE_ENERGY] < terminalVar.storeCapacity * 0.1)
        	{
        		if (_.sum(creep.carry) <= 0)
			    {
			    	if (creep.withdraw(storageVar, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
			    	{
				    	creep.moveTo(storageVar);
				    }
			    }
			    else
			    {
			    	if (creep.transfer(terminalVar, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
			    	{
			    		creep.moveTo(terminalVar);
			    	}
			    }
        	}
        }
    }
};