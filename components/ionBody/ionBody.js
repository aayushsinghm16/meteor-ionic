isIOS = function () {
  return !!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPod/i);
};

isAndroid = function () {
  return navigator.userAgent.indexOf('Android') > 0;
};

Template.registerHelper('isIOS', function () {
  return isIOS();
});

Template.registerHelper('isAndroid', function () {
  return isAndroid();
});

Template.ionBody.helpers({
  platformClasses: function () {
    var classes = ['grade-a'];

    if (Meteor.isCordova) {
      classes.push('platform-cordova');
    }
    if (Meteor.isClient) {
      classes.push('platform-web');
    }
    if (Meteor.isCordova && isIOS()) {
      classes.push('platform-ios');
    }
    if (Meteor.isCordova && isAndroid()) {
      classes.push('platform-android');
    }

    return classes.join(' ');
  }
});

Template.ionBody.events({
  'click [data-ion-modal]': function (event, template) {
    var templateName = $(event.currentTarget).data('ion-modal');
    IonModal.open(templateName, $(event.currentTarget).data());
  },

  'click [data-ion-popover]': function (event, template) {
    var templateName = $(event.currentTarget).data('ion-popover');
    IonPopover.show(templateName, $(event.currentTarget).data(), event.currentTarget);
  },

  'click [data-nav-direction]': function (event, template) {
    $('[data-nav-container]').addClass('nav-view-direction-' + $(event.target).data('nav-direction'));
    $('[data-navbar-container]').addClass('nav-bar-direction-' + $(event.target).data('nav-direction'));
  },

  'click [data-ion-menu-toggle]': function (event, template) {
    if (!IonSideMenu.snapper) {
      return;
    }

    var direction;
    var $el = $(event.target);

    if ($el.data('ion-menu-toggle') !== '') {
      direction = $el.data('ion-menu-toggle');
    } else {
      direction = 'left';
    }

    if(IonSideMenu.snapper.state().state === direction){
      IonSideMenu.snapper.close();
    } else {
      IonSideMenu.snapper.open(direction);
    }
  },

  'click [data-ion-menu-close]': function (event, template) {
    if (!IonSideMenu.snapper) {
      return;
    }
    IonSideMenu.snapper.close();
  }
});
