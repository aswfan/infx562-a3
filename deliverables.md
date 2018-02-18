##Deliverables - INFX 562 Assignment 3##

1. **Data domain and visualization technique**

Stock market is always the most existing wonderland for adventurers. There, entrepreneurs come with craziest ideas and agile investors seek and seize any chance to maximize their profits. Everyday, a large scale of predator-prey game happens in the stock market and the price of a stock fluctuates widely with the general expectation of investors. The more positive investors feel about the business, the higher the price of the stock is. So, having an effective visualization tool to depict the general trend of the stock exchange price as well as volume is of great sense to both average investors and analysts.

So my story here is quite simple. I'd like to have a powerful tool to display the daily prices of different stocks, being able to depict both the long-term and short-term trend of each stock. Since the transaction data of stocks are extremely large and trivial for some of them, it is always a headache for investors as well as analysts. So, it will be helpful to have an interactive visualization save us from tons of meaningless details. 

2. **Storyboard**

In general, it will display transaction data like what candlestick chart does, which stresses out the high, low, open, and close prices of stocks and depict the trend of the price over time as well. To support an interactive communication with user, I would like to enable the visualization to perform some queries based on the dataset. So, when users type in some key words like the company symbol or the transaction date range, the chart will respond correspondingly, filtering the irrelevant information. Besides, it is necessary to simplify the the process and operation so that the most general user can easily understand and play with it without any domain knowledge. 

In summary, the visualization will:

- display transaction data in candlestick chart,
- allow user type in the company symbol to filter the dataset and update the chart,
- allow user type in transaction date to filter the dataset and update the chart.

![](https://github.com/aswfan/MarkdownPhoto/raw/master/myPhotos/storyboard4.JPG)

![](https://github.com/aswfan/MarkdownPhoto/raw/master/myPhotos/storyboard2.JPG)

![](https://github.com/aswfan/MarkdownPhoto/raw/master/myPhotos/storyboard3.JPG)



3. **Data Source**

The dataset used here is obtained from *Kaggle*. It includes daily prices of companies on New York stock market, spanning from 2010 to the end 2016. Following are the columns contained in the dataset:

| Column Name | Data Type | Description                              |
| ----------- | --------- | ---------------------------------------- |
| date        | DateTime  | Transaction date                         |
| symbol      | String    | Company symbol on the stock market       |
| open        | Numeric   | The final price of the stock upon the opening of an exchange on a given day |
| close       | Numeric   | The final price of the stock on a given day |
| low         | Numeric   | The lowest price of the stock on a given day |
| high        | Numeric   | The highest price of the stock on a given day |
| volume      | Numeric   | The total number of transaction of the stock on a given day |

Link: https://www.kaggle.com/dgawlik/nyse

4. **Final interactive visualization application**

Following are the screenshots of my final visualization. As you can see from first screenshot, my visualization are split into 6 parts. They are `Company Symbol` search box, `Date Range` drop down box, `View` button, `short-term candlestick chart`, `long-term trend chart`, and `Transaction Details` board.

![General Description](https://github.com/aswfan/MarkdownPhoto/raw/master/myPhotos/a3-1.png)

5. **Explanation of changes**

Beside the expected interaction mentioned above, I also add some new interactions for user to better analyze the dataset. Following are detailed descriptions for features.

- <u>Search by company symbol:</u>

User types in the company symbol in the highlight input box and click `View` button on the right to update the charts below. 

![](https://github.com/aswfan/MarkdownPhoto/raw/master/myPhotos/a3-2.png)

- <u>Filter the dataset by date:</u>

After getting the transaction data for a specific company, user then can change the transaction date range through the `Date Range` drop down box. Once selecting the date range and clicking the `View` button, the charts blow will get update to the desired date range.

![](https://github.com/aswfan/MarkdownPhoto/raw/master/myPhotos/a3-3.png)

![](https://github.com/aswfan/MarkdownPhoto/raw/master/myPhotos/a3-6.png)

- <u>Mouse-hover interaction:</u>

While the mouse gets hovered on the `short-term candlestick chart`, a crosshair with dot line will show up and the corresponding values in both axis will get highlighted. Apart from that, the detailed transaction data of the company on that day will get updated on the `Transaction Details` board.

![](https://github.com/aswfan/MarkdownPhoto/raw/master/myPhotos/a3-4.png)

- <u>Brushing of the plot:</u>

User can also brush the `long-term trend chart` to roughly filter the dataset and update `short-term candlestick chart` as well. 

![](https://github.com/aswfan/MarkdownPhoto/raw/master/myPhotos/a3-5.png)

6. **Development process**

- From this assignment, I find *D3* is really an powerful tool in visualization design and implementation. It is based on JavaScript and gives large flexibility for its user to design and implement its idea. At first, when I am not quite familiar with *D3*, I don't know what it can do. So I just hope it could help me do some interactive visualization as how *Tableau* help me with non-interactive charts. But it far more exceeds my expectation. As you can see from the changes between the storyboard and the final implementation, I add a lot of new features to my original design! Starting from some idea, I search and learn from examples on the Internet and keep improving my chart. I really enjoy the whole process!
- As our TA mentioned in the first week, the learning curve of *D3* is really steep and I spend almost the whole week to learn *D3* and think about how to present the dataset. Sometime, I just got stuck in the confliction of different version of JavaScript library (*JQuery* and *Bootstrap*). Although it takes me a lot of time, I have to say it all get paid off at last. 





