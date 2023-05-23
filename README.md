# autocomplete-off
An Angular directive to prevent the browser's autocomplete feature from activating on inputs
The directive is actually called **appForId**, but externally I use **autocomplete-off** to aid in searching repos.

## Why does this directive exist and how to use it.
This directive prevents the browser's autocomplete feature from triggering on an input. Autocomplete is where when you focus on an input a drop down list of previously
entered in values appear. This can be great on a user's personal computer filling in their personal information; not so much when you have a business application
where the user is filling in data that has nothing to do with them.

There is no reliable way to disable this feature in the browser. Attempts to set the autocomplete attribute to new-password, or the approach in this repo:
 https://github.com/matteobad/detect-autofill do not work.
 
## How it works:
You tag the label and input with this directive and pass in the same string value (ie: 'customer-first-name'). This directive will then generate
a random number and add it onto the end of the string. By ensuring that a unique identifier is used, the browser will not be able to auto complete previous values.
I like how this approach doesn't get in the way of accessibility.
 
 ## Restrictions:
Note that the label and input should have a parent that uses the **.control-group** class. This makes it easier for the directive to find the other control, without
searching the entire document. If this doesn't fit your application, you can update the directive to simply search the entire document. 
 
 ### Sample Usage:
 ```
 <div class="control-group">
    <label appForId="customer-first-name">First Name</label>
    <input appForId="customer-first-name" formControlName="firstName" />
 </div>
```

### And the DOM ends up looking like this:
```
<div class="control-group">
    <label for="customer-first-name-2193838">First Name</label>
    <input id="customer-first-name-2193838" formControlName="firstName"/>
 </div>
 ```
 
 
