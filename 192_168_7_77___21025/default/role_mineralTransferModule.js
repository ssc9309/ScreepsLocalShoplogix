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
	var lab6 = Game.getObjectById('0def215d6215d01');
	var lab7 = Game.getObjectById('ce913d501080c69');
	var lab8 = Game.getObjectById('10002a09b848458');
	var lab9 = Game.getObjectById('9c96336f57e2d7a');

	//Layout
	//Lab8 Lab9
	//Lab6 Lab7
	//Lab4 Lab5 
	//Lab2 lab3 
	//Lab0 Lab1 

	//Mineral Layout
	//G  G
	//UL UL
	//ZK ZK
	//L  U
	//Z  K

	//73506e7007ee130
	//bcddcde4ea3567f
	//3fab9357ddfd192
	//f4b1e1f8c783a49
	//0fd5d18db0e415c
	//e239d972de9f63e
	
    
    //if (terminalVar)// && labs.length > 5)
    
    /*
    if (_.sum(creep.carry) <= 0)
    {
    	creep.withdraw(lab1, RESOURCE_UTRIUM);
    	creep.moveTo(lab1);
    }
    else
    {
    	creep.transfer(terminalVar, RESOURCE_UTRIUM);
    	creep.moveTo(terminalVar);
    }
	*/
	if (creep.room.name != 'W8N8')
	{
	    var nukerVar = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
	    {
	        filter: function(object)
	        {
	            return object.structureType == STRUCTURE_NUKER && object.ghodium < object.ghodiumCapacity;
	        }
	    });
	    
	    if (nukerVar)
	    {
	        if (_.sum(creep.carry) <= 0)
	        {
	    		if (creep.withdraw(terminalVar, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
	            {
	            	creep.moveTo(terminalVar);
	            }
	        }
	        else
	        {
	        	//console.log(creep.transfer(nukerVar, RESOURCE_GHODIUM));
	        	if (creep.transfer(nukerVar, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
		    	{
		    		creep.moveTo(nukerVar);
		    	}
	        }
	    }
	    else
	    {
	        if (_.sum(creep.carry) > 0)
	        {
	    		if (creep.transfer(terminalVar, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
	            {
	            	creep.moveTo(terminalVar);
	            }
	        }
	    }
	}
    else 
    {
        var ghodiumTransferDone = true;
    	if (lab8.mineralAmount >= lab8.mineralCapacity || creep.carry[RESOURCE_GHODIUM] > 0 || lab8.mineralAmount >= creep.carryCapacity)
    	{
    		ghodiumTransferDone = false;
    		var nukerVar = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, 
    		{
    			filter: function(object)
    			{
    				return object.structureType == STRUCTURE_NUKER && object.ghodium < object.ghodiumCapacity;
    			}
    		});
    
    		//console.log(nukerVar.hits);
    		//console.log(nukerVar);
    		if (nukerVar)
    		{
    			if (_.sum(creep.carry) <= 0)
    	        {
    	    		if (creep.withdraw(lab8, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
    	            {
    	            	creep.moveTo(lab8);
    	            }
    	        }
    	        else
    	        {
    	        	//console.log(creep.transfer(nukerVar, RESOURCE_GHODIUM));
    	        	if (creep.transfer(nukerVar, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
    		    	{
    		    		creep.moveTo(nukerVar);
    		    	}
    	        }
    		}
    		else
    		{
    		    var terminalWithoutGhodium = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
    		    {
    		        filter: function(object)
    		        {
    		            return object.structureType == STRUCTURE_TERMINAL && (!object.store[RESOURCE_GHODIUM] || object.store[RESOURCE_GHODIUM] < 5000);
    		        }
    		    });
    		    
    		    if (terminalWithoutGhodium)
    		    {
    		        if (_.sum(creep.carry) <= 0)
        	        {
        	    		if (creep.withdraw(lab8, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
        	            {
        	            	creep.moveTo(lab8);
        	            }
        	        }
        	        else
        	        {
        	        	//console.log(creep.transfer(nukerVar, RESOURCE_GHODIUM));
        	        	if (creep.transfer(terminalWithoutGhodium, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
        		    	{
        		    		creep.moveTo(terminalWithoutGhodium);
        		    	}
        	        }
    		    }
    		    else
    		    {
        			if (_.sum(creep.carry) > 0 && creep.carry[RESOURCE_GHODIUM])
        	        {
        	    		if (creep.transfer(lab8, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
        	            {
        	            	creep.moveTo(lab8);
        	            }
        	        }
        	        else
        	        {
        	            ghodiumTransferDone = true;
        	        }
    		    }
    		}
    	}
    	else if (lab9.mineralAmount >= lab9.mineralCapacity || creep.carry[RESOURCE_GHODIUM] > 0 || lab9.mineralAmount >= creep.carryCapacity)
    	{
    		ghodiumTransferDone = false;
    		var nukerVar = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, 
    		{
    			filter: function(object)
    			{
    				return object.structureType == STRUCTURE_NUKER && object.ghodium < object.ghodiumCapacity;
    			}
    		});
    
    		//console.log(nukerVar.hits);
    		if (nukerVar)
    		{
    			if (_.sum(creep.carry) <= 0)
    	        {
    	    		if (creep.withdraw(lab9, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
    	            {
    	            	creep.moveTo(lab9);
    	            }
    	        }
    	        else
    	        {
    	        	//console.log(creep.transfer(nukerVar, RESOURCE_GHODIUM));
    	        	if (creep.transfer(nukerVar, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
    		    	{
    		    		creep.moveTo(nukerVar);
    		    	}
    	        }
    		}
    		else
    		{
    			var terminalWithoutGhodium = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
    		    {
    		        filter: function(object)
    		        {
    		            return object.structureType == STRUCTURE_TERMINAL && (!object.store[RESOURCE_GHODIUM] || object.store[RESOURCE_GHODIUM] < 5000);
    		        }
    		    });
    		    
    		    if (terminalWithoutGhodium)
    		    {
    		        if (_.sum(creep.carry) <= 0)
        	        {
        	    		if (creep.withdraw(lab9, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
        	            {
        	            	creep.moveTo(lab9);
        	            }
        	        }
        	        else
        	        {
        	        	//console.log(creep.transfer(nukerVar, RESOURCE_GHODIUM));
        	        	if (creep.transfer(terminalWithoutGhodium, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
        		    	{
        		    		creep.moveTo(terminalWithoutGhodium);
        		    	}
        	        }
    		    }
    		    else
    		    {
        			if (_.sum(creep.carry) > 0 && creep.carry[RESOURCE_GHODIUM])
        	        {
        	    		if (creep.transfer(lab9, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE)
        	            {
        	            	creep.moveTo(lab9);
        	            }
        	        }
        	        else
        	        {
        	            ghodiumTransferDone = true;
        	        }
    		    }
    		}
    	}

    	//console.log(creep.room.name + ghodiumTransferDone);
    	
        if (terminalVar && ghodiumTransferDone)
        //else if (false)
        {
        	var terminalResourceType = '';
    
        	if (terminalVar.store[RESOURCE_ZYNTHIUM] > 0 && lab0.mineralAmount <= 500)
        	{
        		terminalResourceType = RESOURCE_ZYNTHIUM;
        	}
        	else if (terminalVar.store[RESOURCE_KEANIUM] > 0 && lab1.mineralAmount <= 500)
        	{
                terminalResourceType = RESOURCE_KEANIUM;
            }
            else if (terminalVar.store[RESOURCE_LEMERGIUM] > 0 && lab2.mineralAmount <= 500)
        	{
                terminalResourceType = RESOURCE_LEMERGIUM;
            }
            else if (terminalVar.store[RESOURCE_UTRIUM] > 0 && lab3.mineralAmount <= 500)
        	{
                terminalResourceType = RESOURCE_UTRIUM;
            }
    
            if (terminalResourceType != "")
            {
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
    	    		else if (creep.carry[RESOURCE_KEANIUM] > 0)
    	    		{
    	    			if (lab1.mineralAmount >= lab1.mineralCapacity)
    	    			{
    	    				if (creep.transfer(terminalVar, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE)
    		    			{
    		    				creep.moveTo(terminalVar);
    		    			}
    	    			}
    	    			else
    	    			{
    		    			if (creep.transfer(lab1, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE)
    		    			{
    		    				creep.moveTo(lab1);
    		    			}
    		    		}
    	    		}
    	    		else if (creep.carry[RESOURCE_LEMERGIUM] > 0)
    	    		{
    	    			if (lab2.mineralAmount >= lab2.mineralCapacity)
    	    			{
    	    				if (creep.transfer(terminalVar, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE)
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
    	    		else if (creep.carry[RESOURCE_UTRIUM] > 0)
    	    		{
    	    			if (lab3.mineralAmount >= lab3.mineralCapacity)
    	    			{
    	    				if (creep.transfer(terminalVar, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE)
    		    			{
    		    				creep.moveTo(terminalVar);
    		    			}
    	    			}
    	    			else
    	    			{
    		    			if (creep.transfer(lab3, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE)
    		    			{
    		    				creep.moveTo(lab3);
    		    			}
    		    		}
    	    		}
    	    		else if (creep.carry[RESOURCE_ENERGY] > 0)
    	    		{
    	    			if (storageVar)
    	    			{
    	    				if (creep.transfer(storageVar, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
    	    				{
    	    					creep.moveTo(storageVar);
    	    				}
    	    			}
    	    		}
    	        }
    	    }
    
            else
            {
            	//console.log(storageVar.store[RESOURCE_ENERGY] > storageVar.storeCapacity / 2);
    
            	//if the labs have all the minerals, then fill them and nuker up with energy
    
            	var energyNeedingLab = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, 
            	{
            		filter: function(object)
            		{
            			return object.structureType == STRUCTURE_LAB && object.energy < object.energyCapacity;
            		}
            	});
            	if (energyNeedingLab)
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
    			    	if (creep.transfer(energyNeedingLab, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
    			    	{
    			    		creep.moveTo(energyNeedingLab);
    			    	}
    			    }
            	}
            	else
            	{
            		var energyNeedingNuker = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, 
    	        	{
    	        		filter: function(object)
    	        		{
    	        			return object.structureType == STRUCTURE_NUKER && object.energy < object.energyCapacity;
    	        		}
    	        	});
    	        	if (energyNeedingNuker)
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
    				    	if (creep.transfer(energyNeedingNuker, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
    				    	{
    				    		creep.moveTo(energyNeedingNuker);
    				    	}
    				    }
    	        	}
    	        	else
    	        	{
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
    		        	else if (_.sum(creep.carry) > 0)
    				    {
    				    	if (creep.transfer(terminalVar, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
    				    	{
    				    		creep.moveTo(terminalVar);
    				    	}
    				    }
    	        	}
            	}
            }
        }
    }
};