


### 1. How did you make the two requests run at the same time? 

I used `Promise.all` so both `fetchCategories` and `fetchInitialExpenses` trigger at the same time instead of waiting for each other:

```javascript
const results = await Promise.all([
  fetchCategories(),
  fetchInitialExpenses()
]);

If we did it sequentialy using 'awailt 'one by one, it would look like this:
const categories = await fetchCategories();
const initialExpenses = await fetchInitialExpenses();

Why the sequential version is slower:
Because the second request (fetchInitialExpenses) will just sit there waiting until fetchCategories is completely done (taking 300ms). So the total waiting time is 300ms + 500ms = 800ms.

By using 'Promise.all', both network calls run in parallel, so the whole process only takes the longest request (500ms).


## 2. Why is event delegation a better fit for the category buttons than adding a listener to each one?

Instead of attaching a separate click listener to each button, i placing one listener on #filters and checked e.target.

Why it is better:
- Easier to manage and uses less memory than registering multiple listeners.
- The buttons are created dynamically from the API, so one parent listener handles them automatically without re attaching events.




### 3. Multiple Choice Questions

1-C
2-B
3-B
4-A
5-C
6-B
7-B
8-B
9-B
10-B