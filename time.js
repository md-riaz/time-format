function Constructor(date, options = {}) {
   if (!Array.isArray(date)) {
      date = [date];
   }

   let settings = Object.assign(
      {
         months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
         ],
         days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      },
      options
   );

   Object.freeze(settings);

   Object.defineProperties(this, {
      date: {
         value: new Date(...date),
      },
      settings: {
         value: settings,
      },
   });
}

Constructor.prototype.getDay = function () {
   return this.settings.days[this.date.getDay()];
};

Constructor.prototype.getMonth = function () {
   return this.settings.months[this.date.getMonth()];
};

Constructor.prototype.addDays = function (n) {
   let d = new Date(this.date);
   d.setDate(d.getDate() + n);
   return new Constructor(d);
};

Constructor.prototype.addMonths = function (n) {
   let d = new Date(this.date);
   d.setMonth(d.getMonth() + n);
   return new Constructor(d);
};

Constructor.prototype.addYears = function (n) {
   let d = new Date(this.date);
   d.setFullYear(d.getFullYear() + n);
   return new Constructor(d);
};

Constructor.prototype.format = function (format) {
   let d = this.date;
   let months = this.settings.months;
   let days = this.settings.days;

   return format.replace(
      /%([a-z]+)/gi,
      function (match, p1) {
         switch (p1) {
            case 'd':
               return d.getDate();
            case 'dd':
               return ('0' + d.getDate()).slice(-2);
            case 'ddd':
               return days[d.getDay()].slice(0, 3);
            case 'dddd':
               return days[d.getDay()];
            case 'm':
               return d.getMonth() + 1;
            case 'mm':
               return ('0' + (d.getMonth() + 1)).slice(-2);
            case 'mmm':
               return months[d.getMonth()].slice(0, 3);
            case 'mmmm':
               return months[d.getMonth()];
            case 'yy':
               return d.getFullYear().toString().slice(-2);
            case 'yyyy':
               return d.getFullYear();
            case 'h':
               return d.getHours();
            case 'hh':
               return ('0' + d.getHours()).slice(-2);
            case 'ii':
               return d.getMinutes();
            case 'ss':
               return d.getSeconds();
            case 'aa':
               return d.getHours() > 12 ? 'PM' : 'AM';

            default:
               return match;
         }
      },
      this
   );
};

export default Constructor;
