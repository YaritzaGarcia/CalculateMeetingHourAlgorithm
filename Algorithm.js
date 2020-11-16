import alasql from "alasql";
import rrule from "rrule";

// Created by Yaritza M. García Chaparro for INSO4101 class project

// Node class
class Node {
  //data structure example
  // {
  //  user_schedule_id: 1,
  //  event_title: "Work",
  //  start_date_time: "2020-11-04T11:30:30.057Z",
  //  end_date_time: "2020-11-04T20:30:30.057Z",
  //  r_rule: "RRULE:INTERVAL=1;FREQ=DAILY;COUNT=27",
  //  ex_dates: null,
  //  user_id: 1,
  // }

  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Binary Search tree class
// Original Binary Search tree implementation: https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
// Note: Most of the methods/functions have been modified to handle schedule objects.
// The following methods are original and have been created from scratch: countLeftNodes, countRightNodes, inorderArray, rearrangeTree.
class BinarySearchTree {
  constructor() {
    // root of a binary search tree
    this.root = null;
  }

  // Counts all nodes that are on the left side of the given node.
  countLeftNodes(node) {
    if (node !== null && node !== undefined)
      return this.inorderArray(node.left, []).length;
    return 0;
  }

  // Counts all nodes that are on the right side of the given node.
  countRightNodes(node) {
    if (node !== null && node !== undefined)
      return this.inorderArray(node.right, []).length;
    return 0;
  }

  // helper method which creates a new node to be inserted and calls insertNode
  insert(data) {
    // Creating a node and initailising
    // with data
    var newNode = new Node(data);

    // root is null then node will
    // be added to the tree and made root.
    if (this.root === null) this.root = newNode;
    // find the correct position in the
    // tree and add the node
    else this.insertNode(this.root, newNode);
  }

  // Method to insert a node in a tree
  // it moves over the tree to find the location to insert a node with a given data
  insertNode(node, newNode) {
    // if the data is less than the node
    // data move left of the tree
    if (newNode.data.start_date_time < node.data.start_date_time) {
      // if left is null insert node here
      if (node.left === null || node.left === undefined) node.left = newNode;
      // if left is not null recur until
      // null is found
      else this.insertNode(node.left, newNode);
    }

    // if the data is more than the node
    // data move right of the tree
    else {
      // if right is null insert node here
      if (node.right === null || node.right === undefined) node.right = newNode;
      // if right is not null recur until
      // null is found
      else this.insertNode(node.right, newNode);
    }
  }

  // helper method that calls the removeNode with a given data/starting date of an event
  remove(data) {
    // root is re-initialized with 2
    // root of a modified tree.
    this.root = this.removeNode(this.root, data);
  }

  // Method to remove node with a given data/starting date of an event
  // it recur over the tree to find the node and removes it
  removeNode(node, startDate) {
    // if the root is null then tree is
    // empty
    if (node === null || node === undefined) return null;
    // if data to be delete is less than
    // roots data then move to left subtree
    else if (startDate < node.data.start_date_time) {
      node.left = this.removeNode(node.left, startDate);
      return node;
    }

    // if data to be delete is greater than
    // roots data then move to right subtree
    else if (startDate > node.data.start_date_time) {
      node.right = this.removeNode(node.right, startDate);
      return node;
    }

    // if data is similar to the root's data
    // then delete this node
    else {
      // deleting node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // deleting node with one children
      if (node.left === null || node.left === undefined) {
        node = node.right;
        return node;
      } else if (node.right === null || node.right === undefined) {
        node = node.left;
        return node;
      }

      // Deleting node with two children
      // minumum node of the rigt subtree
      // is stored in aux
      var aux = this.findMinNode(node.right);
      node.data = aux.data;

      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }

  // finds the minimum node in tree
  // searching starts from given node
  findMinNode(node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.left === null || node.left === undefined) return node;
    else return this.findMinNode(node.left);
  }

  // finds the maximum node in tree
  // searching starts from given node
  findMaxNode(node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.right === null || node.right === undefined) return node;
    else return this.findMaxNode(node.right);
  }

  // returns root node of the tree
  getRootNode() {
    return this.root;
  }

  // Performs inorder traversal of a tree
  inorder(node) {
    if (node !== undefined && node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }

  // Performs inorder traversal of a tree and return an array with all the data of the nodes.
  inorderArray(node, arr) {
    if (node !== undefined && node !== null) {
      this.inorderArray(node.left, arr);
      arr.push(node.data);
      this.inorderArray(node.right, arr);
    }

    return arr;
  }

  // Performs preorder traversal of a tree
  preorder(node) {
    if (node !== undefined && node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  // Performs postorder traversal of a tree
  postorder(node) {
    if (node !== undefined && node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }

  // search for a node with given data
  search(node, data) {
    // if trees is empty return null
    if (node === null || node === undefined) return null;
    // if data is less than node's data
    // move left
    else if (data.start_date_time < node.data.start_date_time)
      return this.search(node.left, data);
    // if data is less than node's data
    // move left
    else if (
      data.start_date_time > node.data.start_date_time ||
      data.end_date_time !== node.data.end_date_time
    )
      return this.search(node.right, data);
    // if data is equal to the node data
    // return node
    else return node;
  }

  // It takes all the values of the BST and distributes them equally in the tree.
  rearrangeTree(arr, bst) {
    if (arr.length <= 0) {
      return;
    }
    var rightSide = [];
    var leftSide = [];

    bst.insert(arr[Math.round((arr.length - 1) / 2)]);
    rightSide = arr.slice(Math.round((arr.length - 1) / 2) + 1, arr.length);
    leftSide = arr.slice(0, Math.round((arr.length - 1) / 2));

    this.rearrangeTree(rightSide, bst);
    this.rearrangeTree(leftSide, bst);
    return bst;
  }
}

// Main function
/**
 * This function receives the information (id and schedule) of all the team members/users that request a new meeting.
 * It also receives a range of dates in which the meeting must be and the minimum period of time that the meeting has to have.
 * Then it returns an array with all the appointments objects where the team can have the meeting.
 * @param {Array} teamMembers An array of objects with the information (id and schedule) of all team members. The format of the object need to be: {id: #, schedule:[{...},{...}]}
 * @param {Object} teamLeader An object with the information of the team leader. The format of the object need to be: {id: #, schedule:[{...},{...}]}.
 * @param {JSONDate} startingDay First possible date for the meeting.
 * @param {JSONDate} finishDay Last possible date for the meeting.
 * @param {Integer} amountHours The minimum number of hours for the meeting.
 * @param {Integer} amountMinutes The minimum number of minutes for the meeting.
 * @param {String} meetingTitle Name of the event.
 * @param {Integer} userId Identification number of the user or team to which the hours will be added.
 * @return {Array} An array of appointment objects with all the possible hours for the meeting.
 */
function getMeetingHours(
  teamMembers,
  teamLeader,
  startingDay,
  finishDay,
  amountHours,
  amountMinutes,
  meetingTitle,
  userId
) {
  var leaderSc = convertToOneTimeAppointments(
    teamLeader.schedule,
    startingDay,
    finishDay
  );

  var tempLeader = {
    id: teamLeader.id,
    schedule: leaderSc,
  };

  var teamLeaderPro = getUserFreeHoursTree(
    tempLeader,
    startingDay,
    finishDay,
    amountHours,
    amountMinutes
  );

  var result = new BinarySearchTree();

  var counter = 0;
  teamMembers.forEach((member) => {
    var memberSc = convertToOneTimeAppointments(
      member.schedule,
      startingDay,
      finishDay
    );

    var tempMember = {
      id: member.id,
      schedule: memberSc,
    };

    var memberFreeSc = getUserFreeHoursTree(
      tempMember,
      startingDay,
      finishDay,
      amountHours,
      amountMinutes
    );

    if (counter == 0) {
      checkPossibleTimeSlot(
        teamLeaderPro.getRootNode(),
        memberFreeSc.getRootNode(),
        result,
        amountHours,
        amountMinutes,
        meetingTitle,
        userId
      );
      counter++;
    } else {
      var tempResult = result.getRootNode();
      result = new BinarySearchTree();
      checkPossibleTimeSlot(
        tempResult,
        memberFreeSc.getRootNode(),
        result,
        amountHours,
        amountMinutes,
        meetingTitle,
        userId
      );
    }
  });

  return result.inorderArray(result.getRootNode(), []);
}

//Helper functions
/**
 * This function takes two nodes and iterates over the first one and then calls the helper function.
 * The purpose of the function is to compare all the values that are linked to the first node, with all the values of the second node using the helper function.
 * This returns all the free hours that two users have in common.
 * @param {Node} node Node that contains the data to be compared.
 * @param {Node} node2 Node where the data of a schedule is stored.
 * @param {BinarySearchTree} bstResult Binary search tree in which the result will be saved.
 * @param {Integer} amountHours The minimum number of hours for the meeting.
 * @param {Integer} amountMinutes The minimum number of minutes for the meeting.
 * @param {String} meetingTitle Name of the event.
 * @param {Integer} userId Identification number of the user or team to which the hours will be added.
 * @return {BinarySearchTree} A binary search tree with all free hours in common between node and node 2.
 */
function checkPossibleTimeSlot(
  node,
  node2,
  bstResult,
  amountHours,
  amountMinutes,
  meetingTitle,
  userId
) {
  if (node === null || node === undefined) {
    return;
  }

  checkPossibleTimeSlotHelper(
    node,
    node2,
    bstResult,
    amountHours,
    amountMinutes,
    meetingTitle,
    userId
  );

  checkPossibleTimeSlot(
    node.left,
    node2,
    bstResult,
    amountHours,
    amountMinutes,
    meetingTitle,
    userId
  );
  checkPossibleTimeSlot(
    node.right,
    node2,
    bstResult,
    amountHours,
    amountMinutes,
    meetingTitle,
    userId
  );
}

/**
 * This function takes two nodes and iterates over the second in order to compare the value of the first node with all the values linked to the second node.
 * This generates a new BST with all the values of the second node that have times in common with the value of the first node.
 * @param {Node} node Node that contains the data to be compared.
 * @param {Node} node2 Node where the data of a schedule is stored. This node will be the one to iterate through.
 * @param {BinarySearchTree} bstResult Binary search tree in which the result will be saved.
 * @param {Integer} amountHours The minimum number of hours for the meeting.
 * @param {Integer} amountMinutes The minimum number of minutes for the meeting.
 * @param {String} meetingTitle Name of the event.
 * @param {Integer} userId Identification number of the user or team to which the hours will be added.
 * @return {BinarySearchTree} A binary search tree with all free hours in common between node and node 2.
 */
function checkPossibleTimeSlotHelper(
  node,
  node2,
  bstResult,
  amountHours,
  amountMinutes,
  meetingTitle,
  userId
) {
  if (
    node2 === null ||
    node2 === undefined ||
    (node2.data.start_date_time > node.data.start_date_time &&
      node2.data.end_date_time > node.data.end_date_time)
  ) {
    return;
  }

  checkPossibleTimeSlotHelper(
    node,
    node2.left,
    bstResult,
    amountHours,
    amountMinutes,
    meetingTitle,
    userId
  );
  var tempObjEvent = calculateTimeSlot(
    node.data.start_date_time,
    node.data.end_date_time,
    node2.data.start_date_time,
    node2.data.end_date_time,
    amountHours,
    amountMinutes
  );
  if (
    tempObjEvent.start_date_time !== null &&
    tempObjEvent.end_date_time !== null
  ) {
    bstResult.insert({
      user_schedule_id: 1,
      event_title: meetingTitle,
      start_date_time: tempObjEvent.start_date_time,
      end_date_time: tempObjEvent.end_date_time,
      r_rule: null,
      ex_dates: null,
      user_id: userId,
    });
  }

  checkPossibleTimeSlotHelper(
    node,
    node2.right,
    bstResult,
    amountHours,
    amountMinutes,
    meetingTitle,
    userId
  );
}

/**
 * The function calculates startDate and endDate that have two startDate and two endDate, in common.
 * If the amount of time between the resulting startDate and endDate is less than the given amountHours and amountMinutes, it returns [null, null].
 * If the given dates do not have hours in common, return [null, null].
 * @param {Date} startDate1 Start date of the first time period to analize
 * @param {Date} endDate1 End date of the first time period to analize
 * @param {Date} startDate2 Start date of the second time period to analize
 * @param {Date} endDate2 End date of the second time period to analize
 * @param {Integer} amountHours The minimum number of hours for the meeting.
 * @param {Integer} amountMinutes The minimum number of minutes for the meeting.
 * @return {Object} Returns an object with two properties: start_date_time (Start date of free time period in common) and end_date_time (End date of free time period in common)
 *
 * Example: startDate1 = "2020-11-09T22:30:00.000Z", endDate1 = "2020-11-10T14:00:33.542Z",
 *          startDate2 = "2020-11-09T22:00:33.542Z", endDate2 = "2020-11-10T11:30:30.057Z",
 * The time slot must have a minimum of 1 hour and 30 minutes. => amountHours = 1, amountMinutes = 30
 * Then the result of the function it's going to be => {start_date_time: "2020-11-09T22:30:00.000Z", end_date_time: "2020-11-10T11:30:30.057Z"})
 */
function calculateTimeSlot(
  startDate1,
  endDate1,
  startDate2,
  endDate2,
  amountHours,
  amountMinutes
) {
  var resultStartDate = null;
  var resultEndDate = null;

  var tempStart = startDate1 <= startDate2 ? startDate2 : startDate1;
  var tempEnd = endDate1 <= endDate2 ? endDate1 : endDate2;
  var hours = diffHoursAndMinutes(tempStart, tempEnd);

  if (
    hours[0] + hours[1] / 60 >= amountHours + amountMinutes / 60 &&
    tempStart >= startDate1 &&
    tempStart <= endDate1 &&
    tempEnd >= startDate1 &&
    tempEnd <= endDate1 &&
    tempStart >= startDate2 &&
    tempStart <= endDate2 &&
    tempEnd >= startDate2 &&
    tempEnd <= endDate2
  ) {
    resultStartDate = tempStart;
    resultEndDate = tempEnd;
  }

  return { start_date_time: resultStartDate, end_date_time: resultEndDate };
}

/**
 * This function takes the user's information and based on their schedule it calculates all the free hours that the user has.
 * @param user User object with the id and schedule. It must have those two properties. The schedule has to be an array/JSON.
 * @param {JSONDate} startingDay First possible date for the meeting.
 * @param {JSONDate} finishDay Last possible date for the meeting.
 * @param {Integer} amountHours The minimum number of hours for the meeting.
 * @param {Integer} amountMinutes The minimum number of minutes for the meeting.
 * @return {BinarySearchTree} A binary search tree with all the user's free hours.
 *
 * Example: User wants a meeting between November 15, 2020 and November 20, 2020 and it should be a 1 hour 30 minute meeting.
 * startingDay is going to be "2020-11-15T04:00:00.057Z" and finishDay is going to be "2020-11-20T04:00:00.057Z".
 * amountHours is going to be 1 and amountMinutes is going to be 30.
 */
function getUserFreeHoursTree(
  user,
  startingDay,
  finishDay,
  amountHours,
  amountMinutes
) {
  var freeHoursTree = new BinarySearchTree();
  var data = null;

  if (user.schedule.length == 0) {
    freeHoursTree.insert({
      user_schedule_id: 1,
      event_title: "Free",
      start_date_time: startingDay,
      end_date_time: finishDay,
      r_rule: null,
      ex_dates: null,
      user_id: user.id,
    });
  } else {
    var countId = 1;
    var hours = diffHoursAndMinutes(
      startingDay,
      user.schedule[0].start_date_time
    );

    if (hours[0] + hours[1] / 60 >= amountHours + amountMinutes / 60) {
      data = {
        user_schedule_id: countId,
        event_title: "Free",
        start_date_time: startingDay,
        end_date_time: user.schedule[0].start_date_time,
        r_rule: null,
        ex_dates: null,
        user_id: user.id,
      };
      countId++;
      freeHoursTree.insert(data);
    }
    data = null;

    for (let i = 0; i < user.schedule.length - 1; i++) {
      hours = diffHoursAndMinutes(
        user.schedule[i].end_date_time,
        user.schedule[i + 1].start_date_time
      );

      if (hours[0] + hours[1] / 60 >= amountHours + amountMinutes / 60) {
        data = {
          user_schedule_id: countId,
          event_title: "Free",
          start_date_time: user.schedule[i].end_date_time,
          end_date_time: user.schedule[i + 1].start_date_time,
          r_rule: null,
          ex_dates: null,
          user_id: user.id,
        };
        countId++;
        freeHoursTree.insert(data);
      }
    }

    hours = diffHoursAndMinutes(
      user.schedule[user.schedule.length - 1].end_date_time,
      finishDay
    );

    if (hours[0] + hours[1] / 60 >= amountHours + amountMinutes / 60) {
      data = {
        user_schedule_id: countId,
        event_title: "Free",
        start_date_time: user.schedule[user.schedule.length - 1].end_date_time,
        end_date_time: finishDay,
        r_rule: null,
        ex_dates: null,
        user_id: user.id,
      };
      freeHoursTree.insert(data);
    }
  }

  return freeHoursTree;
}

/**
 * This function takes a schedule that has events of type "Recurring appointments" to convert it and returns a schedule with all objects of type "One-time appointments".
 * @param {JSONschedule} data Schedule to be analyzed/converted
 * @param {JSONDate} startingDay First possible date for the meeting.
 * @param {JSONDate} finishDay Last possible date for the meeting.
 * @return {JSONschedule} A schedule with all objects of type "One-time appointments"
 *
 * Example: User wants a meeting between November 15, 2020 and November 20, 2020.
 * startingDay is going to be "2020-11-15T04:00:00.057Z" and finishDay is going to be "2020-11-20T04:00:00.057Z".
 * In other words, the function will return all the dates between November 15 and November 20.
 */
function convertToOneTimeAppointments(data, startingDay, finishDay) {
  alasql.fn.betweenDates = function (start, end) {
    return (
      start >= startingDay &&
      start <= finishDay &&
      end <= finishDay &&
      end >= startingDay
    );
  };
  //Filter all events that have r_rule. In other words, the recurring appointments that must be transformed to one-time appointments.
  var recurringAppointment = alasql(
    "SELECT * FROM ? WHERE r_rule IS NOT NULL",
    [data]
  );
  //Filter all events that do not have r_rule. In other words, one-time appointments that don't need any changes.
  var tempResult = alasql(
    "SELECT * FROM ? WHERE r_rule IS NULL AND betweenDates(start_date_time, end_date_time)",
    [data]
  );
  var finalResult = [];

  tempResult.forEach((event) => {
    finalResult.push(event);
  });

  recurringAppointment.forEach((event) => {
    var tempStr = "";
    var weekDay = null;
    var freq = null;
    var count = null;
    var interval = null;
    var until = null;

    var duration = diffHoursAndMinutes(
      event.start_date_time,
      event.end_date_time
    );

    if (event.r_rule.indexOf("BYDAY=") > 0) {
      tempStr = event.r_rule.substring(event.r_rule.indexOf("BYDAY=") + 6);
      weekDay =
        tempStr.indexOf(";") > 0
          ? tempStr.substring(0, tempStr.indexOf(";"))
          : tempStr;
      if (weekDay.split(",")) {
        weekDay = weekDay.split(",");
        var tempArr = [];

        weekDay.forEach((day) => {
          switch (day) {
            case "MO":
              tempArr.push(1);
              break;
            case "TU":
              tempArr.push(2);
              break;
            case "WE":
              tempArr.push(3);
              break;
            case "TH":
              tempArr.push(4);
              break;
            case "FR":
              tempArr.push(5);
              break;
            case "SA":
              tempArr.push(6);
              break;
            case "SU":
              tempArr.push(7);
              break;
          }
        });
      }

      tempStr = "";
    }

    if (event.r_rule.indexOf("FREQ=") > 0) {
      tempStr = event.r_rule.substring(event.r_rule.indexOf("FREQ=") + 5);
      freq =
        tempStr.indexOf(";") > 0
          ? tempStr.substring(0, tempStr.indexOf(";"))
          : tempStr;

      switch (freq) {
        case "YEARLY":
          freq = rrule.RRule.YEARLY;
          break;
        case "MONTHLY":
          freq = rrule.RRule.MONTHLY;
          break;
        case "WEEKLY":
          freq = rrule.RRule.WEEKLY;
          break;
        case "DAILY":
          freq = rrule.RRule.DAILY;
          break;
        case "HOURLY":
          freq = rrule.RRule.HOURLY;
          break;
        case "MINUTELY":
          freq = rrule.RRule.MINUTELY;
          break;
        case "SECONDLY":
          freq = rrule.RRule.SECONDLY;
          break;
        default:
          freq = null;
      }
      tempStr = "";
    }

    if (event.r_rule.indexOf("COUNT=") > 0) {
      tempStr = event.r_rule.substring(event.r_rule.indexOf("COUNT=") + 6);
      count =
        tempStr.indexOf(";") > 0
          ? tempStr.substring(0, tempStr.indexOf(";"))
          : tempStr;
      tempStr = "";
    }

    if (event.r_rule.indexOf("INTERVAL=") > 0) {
      tempStr = event.r_rule.substring(event.r_rule.indexOf("INTERVAL=") + 9);
      interval =
        tempStr.indexOf(";") > 0
          ? tempStr.substring(0, tempStr.indexOf(";"))
          : tempStr;
      interval = parseInt(interval);
      tempStr = "";
    }

    if (event.r_rule.indexOf("UNTIL=") > 0) {
      tempStr = event.r_rule.substring(event.r_rule.indexOf("UNTIL=") + 6);
      until =
        tempStr.indexOf(";") > 0
          ? tempStr.substring(0, tempStr.indexOf(";"))
          : tempStr;
      until = rrule.rrulestr("DTSTART:" + until);
      until = until.origOptions.dtstart;
      tempStr = "";
    }

    //In order to be able to calculate all the dates of a recurring appointment, an RRule object is created based on the r_rule property of that appointment.
    const rule = new rrule.RRule({
      freq: freq,
      interval: interval,
      count: count,
      byweekday: weekDay,
      dtstart: new Date(event.start_date_time),
      until: until,
    });

    //rule.all() will return all dates.
    var ruleElements = rule.all();
    var ruleInfo = {
      eventTitle: event.event_title,
      userScheduleId: event.user_schedule_id,
      userId: event.user_id,
    };

    //Creates an array of appointment type objects, equal to the one given by the API, with all the one-time appointment recurrences of the given appointment.
    for (let index = 0; index < ruleElements.length; index++) {
      //Calculates the end time of the appointment
      var endDate = new Date(ruleElements[index]);
      endDate.setTime(
        endDate.getTime() + duration[0] * 60 * 60 * 1000 + duration[1] * 60000
      );

      if (
        ruleElements[index].toJSON() >= startingDay &&
        ruleElements[index].toJSON() <= finishDay &&
        endDate.toJSON() <= finishDay &&
        endDate.toJSON() >= startingDay
      )
        finalResult.push({
          user_schedule_id: ruleInfo.userScheduleId,
          event_title: ruleInfo.eventTitle,
          start_date_time: new Date(ruleElements[index]).toJSON(),
          end_date_time: endDate.toJSON(),
          r_rule: null,
          ex_dates: null,
          user_id: ruleInfo.userId,
        });
    }
  });

  return finalResult.sort(function (a, b) {
    if (a.start_date_time > b.start_date_time) return 1;
    else return -1;
  });
}

/**
 * Calculate the time difference between two dates
 * @param {Date} dt2 Oldest date
 * @param {Date} dt1 Most recent date
 * @return {Array} Returns an array of integers,
 * the first element [0] is the number of hours between the two dates,
 * the second [1] is the number of minutes between the two dates.
 *
 * Example: dt1 = "2020-11-13T20:00:00.000Z", dt2 = '2020-11-13T21:30:00.000Z',
 * the result will be [1, 30]. In other words, there is a difference of 1 hour and 30 minutes between both dates.
 */
function diffHoursAndMinutes(dt2, dt1) {
  dt1 = new Date(dt1);
  dt2 = new Date(dt2);
  var diffHours = (dt2.getTime() - dt1.getTime()) / 1000;
  diffHours /= 60 * 60;
  var diffMinutes = (dt2.getTime() - dt1.getTime()) / 1000;
  diffMinutes /= 60;
  if (Math.abs(parseInt(diffHours) * 60) <= Math.abs(diffMinutes)) {
    diffMinutes = Math.abs(parseInt(diffHours) * 60) - Math.abs(diffMinutes);
  }
  return [Math.abs(parseInt(diffHours)), Math.abs(Math.round(diffMinutes))];
}

//Testing purposes
// To run this code use the following command: node Algorithm.js

var MariaSchedule = [
  {
    user_schedule_id: 26,
    event_title: "ICOM4009",
    start_date_time: "2020-11-16T18:30:00.000Z",
    end_date_time: "2020-11-16T19:20:00.000Z",
    r_rule:
      "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20201120T192000Z",
    ex_dates: null,
    user_id: 9,
  },
  {
    user_schedule_id: 27,
    event_title: "ADMI4085",
    start_date_time: "2020-11-16T15:00:00.000Z",
    end_date_time: "2020-11-16T15:50:00.000Z",
    r_rule:
      "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20201120T155000Z",
    ex_dates: null,
    user_id: 9,
  },
  {
    user_schedule_id: 25,
    event_title: "INEL4211",
    start_date_time: "2020-11-16T19:30:00.000Z",
    end_date_time: "2020-11-16T22:20:00.000Z",
    r_rule: null,
    ex_dates: null,
    user_id: 9,
  },
  {
    user_schedule_id: 28,
    event_title: "INME5995 (Moonbuggy)",
    start_date_time: "2020-11-18T20:30:00.000Z",
    end_date_time: "2020-11-18T23:20:00.000Z",
    r_rule: null,
    ex_dates: null,
    user_id: 9,
  },
  {
    user_schedule_id: 29,
    event_title: "INEL4206",
    start_date_time: "2020-11-17T16:30:00.000Z",
    end_date_time: "2020-11-17T17:45:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=TU,TH;UNTIL=20201119T174500Z",
    ex_dates: null,
    user_id: 9,
  },
  {
    user_schedule_id: 30,
    event_title: "INEL4207",
    start_date_time: "2020-11-17T18:00:00.000Z",
    end_date_time: "2020-11-17T19:15:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=TU,TH;UNTIL=20201119T191500Z",
    ex_dates: null,
    user_id: 9,
  },
];

var YaritzaSchedule = [
  {
    user_schedule_id: 12,
    event_title: "FISI3172",
    start_date_time: "2020-11-09T19:30:00.000Z",
    end_date_time: "2020-11-09T20:20:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=MO,TU,WE,TH",
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 13,
    event_title: "INSO4101",
    start_date_time: "2020-11-10T18:30:00.000Z",
    end_date_time: "2020-11-10T19:20:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=FR,WE,MO",
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 14,
    event_title: "INSO4101",
    start_date_time: "2020-11-09T18:30:00.000Z",
    end_date_time: "2020-11-09T19:20:00.000Z",
    r_rule: null,
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 15,
    event_title: "MATE3063",
    start_date_time: "2020-11-09T17:30:00.000Z",
    end_date_time: "2020-11-09T18:20:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=MO,WE,FR",
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 16,
    event_title: "FISI3174",
    start_date_time: "2020-11-10T12:30:00.000Z",
    end_date_time: "2020-11-10T14:20:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=TU",
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 17,
    event_title: "INEL4115",
    start_date_time: "2020-11-11T12:30:00.000Z",
    end_date_time: "2020-11-11T14:20:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=WE",
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 18,
    event_title: "INEL3105",
    start_date_time: "2020-11-10T18:00:00.000Z",
    end_date_time: "2020-11-10T19:15:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=TU,TH",
    ex_dates: null,
    user_id: 6,
  },
];

var YeranSchedule = [
  {
    user_schedule_id: 1,
    event_title: "BreakFast",
    start_date_time: "2020-11-13T11:30:59.263Z",
    end_date_time: "2020-11-13T12:00:59.263Z",
    r_rule: null,
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 2,
    event_title: "INGE 3011 Graficas",
    start_date_time: "2020-11-16T11:30:00.000Z",
    end_date_time: "2020-11-16T13:20:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=DAILY;COUNT=30",
    ex_dates:
      "20201116T113000Z,20201117T113000Z,20201119T113000Z,20201121T113000Z,20201118T113000Z,20201120T113000Z",
    user_id: 1,
  },
  {
    user_schedule_id: 5,
    event_title: "INGL3201",
    start_date_time: "2020-11-16T16:30:00.000Z",
    end_date_time: "2020-11-16T17:20:00.000Z",
    r_rule: "RRULE:INTERVAL=2;FREQ=DAILY;COUNT=30",
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 6,
    event_title: "INSO4101",
    start_date_time: "2020-11-16T18:30:00.000Z",
    end_date_time: "2020-11-16T19:20:00.000Z",
    r_rule: "RRULE:INTERVAL=2;FREQ=DAILY;COUNT=3",
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 8,
    event_title: "MATE3063",
    start_date_time: "2020-11-16T19:30:00.000Z",
    end_date_time: "2020-11-16T20:20:00.000Z",
    r_rule: null,
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 9,
    event_title: "MATE3063",
    start_date_time: "2020-11-18T19:30:00.000Z",
    end_date_time: "2020-11-18T20:20:00.000Z",
    r_rule: null,
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 10,
    event_title: "MATE3063",
    start_date_time: "2020-11-20T19:30:00.000Z",
    end_date_time: "2020-11-20T20:20:00.000Z",
    r_rule: null,
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 7,
    event_title: "MATE3063",
    start_date_time: "2020-11-16T19:30:00.000Z",
    end_date_time: "2020-11-16T20:00:00.000Z",
    r_rule: "RRULE:INTERVAL=2;FREQ=DAILY;COUNT=3",
    ex_dates: "20201116T193000Z,20201118T193000Z,20201120T193000Z",
    user_id: 1,
  },
  {
    user_schedule_id: 3,
    event_title: "INGE 3011 Graficas",
    start_date_time: "2020-11-16T11:30:00.000Z",
    end_date_time: "2020-11-16T13:20:00.000Z",
    r_rule: "RRULE:INTERVAL=2;FREQ=DAILY;COUNT=30",
    ex_dates: "20201120T113000Z",
    user_id: 1,
  },
  {
    user_schedule_id: 11,
    event_title: "MUSI3171",
    start_date_time: "2020-11-17T18:00:00.000Z",
    end_date_time: "2020-11-17T19:20:00.000Z",
    r_rule: "RRULE:INTERVAL=2;FREQ=DAILY;COUNT=2",
    ex_dates: null,
    user_id: 1,
  },
];

var LuisSchedule = [
  {
    user_schedule_id: 10,
    event_title: "Electronica",
    start_date_time: "2020-11-16T14:30:53.794Z",
    end_date_time: "2020-11-16T15:20:00.000Z",
    r_rule:
      "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20201121T040000Z",
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 11,
    event_title: "Frances",
    start_date_time: "2020-11-16T15:30:53.794Z",
    end_date_time: "2020-11-16T16:20:00.000Z",
    r_rule:
      "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20201123T160000Z",
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 12,
    event_title: "Circuitos 2",
    start_date_time: "2020-11-16T17:30:53.794Z",
    end_date_time: "2020-11-16T18:20:00.000Z",
    r_rule:
      "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20201123T160000Z",
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 13,
    event_title: "Intro to Soft.",
    start_date_time: "2020-11-16T18:30:53.794Z",
    end_date_time: "2020-11-16T19:20:00.000Z",
    r_rule:
      "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20201123T160000Z",
    ex_dates: null,
    user_id: 6,
  },
  {
    user_schedule_id: 14,
    event_title: "Estadistica",
    start_date_time: "2020-11-16T19:30:53.794Z",
    end_date_time: "2020-11-16T21:20:00.000Z",
    r_rule:
      "RRULE:INTERVAL=1;FREQ=WEEKLY;UNTIL=20201123T160000Z;COUNT=13;BYDAY=MO,WE",
    ex_dates: null,
    user_id: 6,
  },
];

var FernandoSchedule = [
  {
    user_schedule_id: 1,
    event_title: "INEL-3105",
    start_date_time: "2020-11-09T13:30:00.000Z",
    end_date_time: "2020-11-09T14:30:00.000Z",
    r_rule:
      "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20201210T143000Z",
    ex_dates: null,
    user_id: 2,
  },
  {
    user_schedule_id: 2,
    event_title: "INSO-4101",
    start_date_time: "2020-11-09T18:30:00.000Z",
    end_date_time: "2020-11-09T19:30:00.000Z",
    r_rule:
      "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20201210T193000Z",
    ex_dates: null,
    user_id: 2,
  },
  {
    user_schedule_id: 3,
    event_title: "ARTE-3122",
    start_date_time: "2020-11-10T16:30:00.000Z",
    end_date_time: "2020-11-10T19:30:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=TU,TH;UNTIL=20201210T170000Z",
    ex_dates: null,
    user_id: 2,
  },
  {
    user_schedule_id: 4,
    event_title: "INEL-4115",
    start_date_time: "2020-11-12T19:30:00.000Z",
    end_date_time: "2020-11-12T22:30:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=TH;UNTIL=20201210T200000Z",
    ex_dates: null,
    user_id: 2,
  },
];

var OrlandoSchedule = [
  {
    user_schedule_id: 4,
    event_title: "QUIM 3131",
    start_date_time: "2020-11-16T15:30:00.000Z",
    end_date_time: "2020-11-16T16:20:00.000Z",
    r_rule: "RRULE:INTERVAL=4;FREQ=WEEKLY;BYDAY=MO,WE,FR",
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 2,
    event_title: "QUIM 3131",
    start_date_time: "2020-11-16T15:30:00.000Z",
    end_date_time: "2020-11-16T16:20:00.000Z",
    r_rule: "RRULE:INTERVAL=2;FREQ=DAILY;COUNT=30",
    ex_dates:
      "20201116T153000Z,20201120T153000Z,20201122T153000Z,20201124T153000Z,20201126T153000Z,20201128T153000Z,20201118T153000Z",
    user_id: 1,
  },
  {
    user_schedule_id: 5,
    event_title: "INSO ",
    start_date_time: "2020-11-16T18:30:00.000Z",
    end_date_time: "2020-11-16T19:20:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=13",
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 3,
    event_title: "QUIM 3131",
    start_date_time: "2020-11-16T15:30:00.000Z",
    end_date_time: "2020-11-16T16:20:00.000Z",
    r_rule: "RRULE:INTERVAL=4;FREQ=WEEKLY;COUNT=13;BYDAY=MO,WE,FR",
    ex_dates: "20201118T153000Z,20201116T153000Z,20201120T153000Z",
    user_id: 1,
  },
  {
    user_schedule_id: 6,
    event_title: "FISI",
    start_date_time: "2020-11-16T19:30:00.000Z",
    end_date_time: "2020-11-16T20:20:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=MO,TU,WE,TH",
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 7,
    event_title: "ECON",
    start_date_time: "2020-11-16T20:30:00.000Z",
    end_date_time: "2020-11-16T21:45:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=MO,WE",
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 9,
    event_title: "LAB quim",
    start_date_time: "2020-11-20T11:30:00.000Z",
    end_date_time: "2020-11-20T14:30:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=FR",
    ex_dates: null,
    user_id: 1,
  },
  {
    user_schedule_id: 8,
    event_title: "Lab Fisi",
    start_date_time: "2020-11-18T12:30:00.000Z",
    end_date_time: "2020-11-18T14:20:00.000Z",
    r_rule: "RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=13;BYDAY=WE",
    ex_dates: null,
    user_id: 1,
  },
];

var team = getMeetingHours(
  [
    { id: 2, schedule: OrlandoSchedule },
    { id: 3, schedule: FernandoSchedule },
    { id: 4, schedule: LuisSchedule },
    { id: 5, schedule: YeranSchedule },
    { id: 6, schedule: YaritzaSchedule },
  ],
  { id: 1, schedule: MariaSchedule },
  "2020-11-16T10:30:00.000Z",
  "2020-11-20T19:30:00.000Z",
  1,
  0,
  "Finally Done",
  "TeamID"
);

console.log(team);
