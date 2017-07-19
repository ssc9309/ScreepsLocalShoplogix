/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure_labModule');
 * mod.thing == 'a thing'; // true
 */

module.exports = function (spawn)
{
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

	if(!lab0)
	{
		return;
	}

	//console.log(lab0.mineralAmount >= lab0.mineralCapacity);
	if (lab0.mineralAmount > 0 && lab1.mineralAmount > 0)
	{
		lab4.runReaction(lab0, lab1);
	}
	if (lab0.mineralAmount > 0 && lab1.mineralAmount > 0)
	{
		lab5.runReaction(lab0, lab1);
	}
	if (lab2.mineralAmount > 0 && lab3.mineralAmount > 0)
	{
		lab6.runReaction(lab2, lab3);
	}
	if (lab2.mineralAmount > 0 && lab3.mineralAmount > 0)
	{
		lab7.runReaction(lab2, lab3);
	}
	if (lab4.mineralAmount > 0 && lab6.mineralAmount > 0)
	{
		lab8.runReaction(lab4, lab6);
	}
	if (lab5.mineralAmount > 0 && lab7.mineralAmount > 0)
	{
		lab9.runReaction(lab5, lab7);
	}
};