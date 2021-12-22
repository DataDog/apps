const tweets = {
    tweets: [
        {
            name: 'JFrog',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/978188446178082817/86ulJdF0_normal.jpg',
            username: 'jfrog',
            author_id: '38003146',
            id: '1417892235316580353',
            text:
                'Are you leveraging our integrations with @datadoghq, @SlackAPI, @Jira and @pagerduty? They enable you to easily manage incidents with enhanced visibility. Learn more. https://t.co/h5KLDRiXkl #collaboration #monitoring #data #DevOps #incidentmanagement',
            sentiment: 'positive',
            confidenceScore: 0.99,
            confidenceScores: {
                positive: 0.86,
                neutral: 0.0,
                negative: 0.14
            },
            keywords: ['easily', 'enhanced', 'incidents']
        },
        {
            name: 'Dan 🇪🇺🇨🇦',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1191681775166197760/su-UMSzV_normal.jpg',
            username: 'phrawzty',
            author_id: '43346092',
            id: '1417879460674744328',
            text:
                'I have been learning so much about #eBPF in the past couple of weeks, thanks to my fellow colleagues at @datadoghq. My thoughts aren\'t quite crystalised yet, but my initial response vascillates between "wow this is amazing!" and "wow this is terrifying!".',
            sentiment: 'neutral',
            confidenceScore: 0.6,
            confidenceScores: {
                positive: 0.7,
                neutral: 0.0,
                negative: 0.3
            },
            keywords: ['wow', 'learning', 'thanks', 'amazing', 'terrifying']
        },
        {
            name: 'Charles R. Smith🔹',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1315590248290643970/H_7BBINY_normal.jpg',
            username: 'softwarnet',
            author_id: '4148621113',
            id: '1417874007953580033',
            text:
                "@datadoghq #TwitterCensorship This is to let you know we are now blocking sponsored ads on Twitter  Post to all Twitter advertisers and then issue a block - pass it on  Blocking ad posts is effective - it tells the advertiser that we won't view their ads &amp; hits Jack in the wallet",
            sentiment: 'negative',
            confidenceScore: 0.8,
            confidenceScores: {
                positive: 0.2,
                neutral: 0.0,
                negative: 0.8
            },
            keywords: ['Censorship', 'blocking', 'block']
        },
        {
            name: 'María P.',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1392086261511475200/qm_WPFMe_normal.jpg',
            username: 'p_mariaps',
            author_id: '1361992435757428737',
            id: '1417870236519477250',
            text:
                "Interested in learning more about how we use #OpenAPI to facilitate maintenance of our Datadog provider?  Join Thomas Herve of @datadoghq's Engineering team at #HashiTalks Build event tomorrow to hear how OpenAPI saved the day! Register at https://t.co/lrCHsY4wuR @HashiCorpUsers https://t.co/gJmyItjeQC",
            sentiment: 'positive',
            confidenceScore: 0.9,
            confidenceScores: {
                positive: 0.9,
                neutral: 0.0,
                negative: 0.1
            },
            keywords: ['learning', 'join', 'saved', 'interested']
        },
        {
            name: 'Anirudh Varma',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1042120139997495296/raFX7W8m_normal.jpg',
            username: 'anirudhvarma_12',
            author_id: '800098465',
            id: '1417865243309400065',
            text:
                'Anyone here worked with custom @datadoghq metrics over HTTP? My test code is working (I get a 200), but metrics are not showing up in the Metrics explorer.',
            sentiment: 'neutral',
            confidenceScore: 0.8,
            confidenceScores: {
                positive: 0.7,
                neutral: 0.0,
                negative: 0.3
            },
            keywords: ['not', 'working']
        },
        {
            name: '𝕽𝖆𝖙 𝕸𝖆𝖉𝖓𝖊𝖘𝖘',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1282754333893955585/6mxEJxdU_normal.jpg',
            username: 'twilly18',
            author_id: '150062849',
            id: '1417839391595241476',
            text:
                '@datadoghq like that time I went in at 6pm to switch to a new radiology interface.  we got it running at 4 am  I kind of miss doing the interface thing',
            sentiment: 'neutral',
            confidenceScore: 0.9,
            confidenceScores: {
                positive: 0.4,
                neutral: 0.5,
                negative: 0.1
            },
            keywords: ['switch', 'miss', 'like', 'kind']
        },
        {
            name: 'Jose Rodriguez',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1305783608649580544/eqUVwJav_normal.jpg',
            username: 'jmrprieto',
            author_id: '945444283',
            id: '1417792085592264704',
            text:
                'Currently testing @datadoghq integration with @SnowflakeDB. I hit the typical wrong version configuration file error, opened an issue and got a reply within minutes.  Now on to testing some custom monitoring queries. Way to go people!!',
            sentiment: 'postive',
            confidenceScore: 0.9,
            confidenceScores: {
                positive: 0.9,
                neutral: 0.0,
                negative: 0.1
            },
            keywords: ['testing', 'wrong', 'error', 'issue']
        },
        {
            name: 'ON_GOD',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1339741508401057792/ajX68Q-t_normal.jpg',
            username: 'ONGOD20828087',
            author_id: '1339740694752190475',
            id: '1417772843039793153',
            text:
                '@datadoghq Are you looking for a expert digital marketer who will help in pr0moting any kind of your link to active millions audience, generate sales and boost your traffic? or ways to make huge money online ? KINDLY CLICK ON THE LINK BELOW TO KNOW MORE BETTER https://t.co/33r0hYg2n9',
            sentiment: 'neutral',
            confidenceScore: 0.8,
            confidenceScores: {
                positive: 0.6,
                neutral: 0.4,
                negative: 0.0
            },
            keywords: ['boost', 'huge', 'expert']
        },
        {
            name: 'Ozcode',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1232978941259980800/FZ1PYgvh_normal.jpg',
            username: 'oz_code',
            author_id: '325394059',
            id: '1417757483007942658',
            text:
                "Tomorrow's the day.  Spend an hour with @datadoghq and Ozcode and save countless hours debugging in production because to resolve production errors, you need #observability from system down to code. Join us.   https://t.co/2mBECOSbz8",
            sentiment: 'positive',
            confidenceScore: 0.9,
            confidenceScores: {
                positive: 0.8,
                neutral: 0.0,
                negative: 0.2
            },
            keywords: ['save', 'errors', 'resolve']
        },
        {
            name: 'Ste.Crypto',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1411807605681541122/kVIsMcSF_normal.jpg',
            username: 'crive_ste',
            author_id: '1388201224202301449',
            id: '1417750223150063622',
            text:
                '@datadoghq 🚨🚀💎Amnesia is reborn 💎🚀🚨  🔥😍The first token that rewards investors and takes care of the weakest.  🚨🚀 INCREASED REDISTRIBUTION from 5% to 10% with the increase in the market cap 🚨🚀  🌐TELEGRAM INTERNATIONAL:   https://t.co/L8hFkIAlbZ',
            sentiment: 'mixed',
            confidenceScore: 0.6,
            confidenceScores: {
                positive: 0.7,
                neutral: 0.0,
                negative: 0.3
            },
            keywords: ['weakest', 'amnesia', 'rewards', 'increase']
        },
        {
            name: 'Norman Mc Namara',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1188451466928967686/-sZCSpEN_normal.jpg',
            username: 'NamaraNorman',
            author_id: '1188451284627722240',
            id: '1417738498992398340',
            text:
                '@datadoghq Plz Retweet to all you know, all proceeds go to Purple Angel charity https://t.co/1GaFvGOnzg',
            sentiment: 'positive',
            confidenceScore: 0.9,
            confidenceScores: {
                positive: 0.9,
                neutral: 0.1,
                negative: 0.0
            },
            keywords: ['proceeds', 'charity']
        },
        {
            name: 'Priyanka Halder',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1338757266812461057/37_MQFkm_normal.jpg',
            username: 'pri_tech_mom',
            author_id: '122444462',
            id: '1417587846358216711',
            text:
                '6 mine Instagram registration failure can be one of server not responding glitch. And the org can certainly use tools like @datadoghq or @getsentry to monitor how vast affected this bug is. In today’s world you have to support your finding with ROI to get fixed quickly.',
            sentiment: 'positive',
            confidenceScore: 0.8,
            confidenceScores: {
                positive: 0.8,
                neutral: 0.0,
                negative: 0.2
            },
            keywords: ['failire', 'glitch', 'support', 'fixed', 'quickly']
        },
        {
            name: 'James Laverack',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1146089866976997378/aJDmciOJ_normal.jpg',
            username: 'JamesLaverack',
            author_id: '130847901',
            id: '1417558798366019585',
            text:
                'Quote from my friend: “Both @snyksec and @datadoghq are purple dogs, but Snyk looks like he’s about to eat your postman while the datadog dog is fluffy and looks like he’s gonna lick your postman and cover him in metadata.”',
            sentiment: 'positive',
            confidenceScore: 0.6,
            confidenceScores: {
                positive: 0.7,
                neutral: 0.0,
                negative: 0.3
            },
            keywords: ['fluffy', 'lick', 'friend']
        },
        {
            name: 'Scarilian',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/3352042321/e3fa05978351ef87743ed598fc0635d9_normal.png',
            username: 'Scarilianvids',
            author_id: '772151924',
            id: '1417546958831591426',
            text:
                '@datadoghq The only thing we need to identify is why Boris Johnson has not been arrested #ArrestBorisJohnson',
            sentiment: 'negative',
            confidenceScore: 0.6,
            confidenceScores: {
                positive: 0.3,
                neutral: 0.0,
                negative: 0.7
            },
            keywords: ['arrested']
        },
        {
            name: 'Split',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1412435372785627141/JqqGmPAi_normal.jpg',
            username: 'SplitSoftware',
            author_id: '3397498957',
            id: '1417530579646656514',
            text:
                'We are excited to partner with @datadoghq in bringing together feature delivery and observability for safer releases! Read the blog to learn about our Datadog integration. https://t.co/zAYw8yZtbp',
            sentiment: 'positive',
            confidenceScore: 0.9,
            confidenceScores: {
                positive: 0.8,
                neutral: 0.0,
                negative: 0.2
            },
            keywords: ['excited', 'partner', 'safer']
        },
        {
            name: 'Gil Dibner',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/487660925277569024/RAZMoCAp_normal.jpeg',
            username: 'gdibner',
            author_id: '2445481',
            id: '1417526204907900928',
            text:
                "We are super thrilled to be hosting @lennypruss of @AmplifyPartners (and backer of @HashiCorp, @DBTLabs, @datadoghq, @prisma, among others) is joining us for a live webinar where he'll take questions on dev tools and open source business models....join us live tomorrow!",
            sentiment: 'positive',
            confidenceScore: 0.8,
            confidenceScores: {
                positive: 0.8,
                neutral: 0.0,
                negative: 0.2
            },
            keywords: ['super', 'thrilled', 'joining']
        },
        {
            name: 'DevOpsDaysHouston',
            profile_image_url:
                'https://pbs.twimg.com/profile_images/1086017010914316288/7IUjtzmw_normal.jpg',
            username: 'DevOpsDaysHTown',
            author_id: '1063228300145889280',
            id: '1417514729514455041',
            text:
                "We'd like to thank @datadoghq for their GOLD sponsorship to #DevOpsDays #Houston 2021 event! If you'd like to read up on 'em check out their site here:  https://t.co/Xs61OuqD2h Thank you so much for helping the Houston community! #HoustonDoesDevOps #DevOps https://t.co/7HMJev9IR9",
            sentiment: 'positive',
            confidenceScore: 0.9,
            confidenceScores: {
                positive: 0.9,
                neutral: 0.0,
                negative: 0.1
            },
            keywords: ['thank', 'gold', 'sponsorship', 'thank', 'helping']
        }
    ]
};

export default tweets;
