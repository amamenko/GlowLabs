const createNotificationFunction = (newNotification, employee) => {
  let update;

  if (employee.notifications.length >= 20) {
    let sortedArr = employee.notifications.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    sortedArr[0] = newNotification;

    update = {
      notifications: sortedArr,
    };
  } else {
    if (employee.notifications) {
      employee.notifications.push(newNotification);
    } else {
      employee.notifications = [newNotification];
    }

    update = {
      notifications: employee.notifications,
    };

    return update;
  }
};

module.exports = createNotificationFunction;
