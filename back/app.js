import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();

app.use(cors(), json());
app.listen(5000, () => console.log(chalk.bold.green("Servidor operando na porta 5000")));


const users = [];
let tweets = [
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '100',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '110',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '120',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '130',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '140',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '150',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '160',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '170',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '180',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '190',
    },
    {
        username: 'bobesponja',
        avatar: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
        tweetId: '200',
    },
];

app.post('/sign-up', (req, res) => {
    if (req.body.username && req.body.avatar) {
        const userRegister = users.find(
            (user) => user.username === req.body.username
        );
        if (userRegister) {
            res.status(400).send('Usu??rio j?? existe');
        } else {
            users.push(req.body);
            console.log(
                chalk.bold.greenBright(`Usu??rio ${req.body.username} registrado com sucesso!`)
            );
            res.status(201).send('OK');
        }
    } else {
        res.status(400).send('Falta usu??rio ou avatar');
    }
});

app.get('/tweets', (req, res) => {
    const page = parseInt(req.query.page);

    if (!page || page <= 0) {
        res.status(400).send('Informe uma p??gina v??lida!');
    } else {
        const limit = 10;
        const searchTweet = tweets.length - page * limit;
        const firstTweet = (page - 1) * limit;

        let initialValue;
        if (tweets.length <= limit) {
            initialValue = 0;
        } else {
            if (searchTweet < 0) {
                initialValue = 0;
            } else {
                initialValue = searchTweet;
            }
        }

        let finalValue;
        if (firstTweet > tweets.length) {
            finalValue = 0;
        } else {
            if (initialValue === 0) {
                finalValue = tweets.length - firstTweet;
            } else {
                finalValue = initialValue + limit;
            }
        }
        res.send(tweets.slice(initialValue, finalValue).reverse());
    }
});

app.get('/tweets/:username', (req, res) => {
    const { username } = req.params;
    const user = users.find((user) => user.username === username);
    if (user) {
        const tweetsUser = tweets.filter(
            (tweet) => tweet.username === username
        );
        res.status(200).send(tweetsUser);
    } else {
        res.status(404).send('Usu??rio n??o encontrado');
    }
});

app.post('/tweets', (req, res) => {
    const tweetMessage = req.body.tweet;
    const { user } = req.headers;
    if (tweetMessage && user) {
        let tweet = {
            username: user,
            tweet: tweetMessage,
        };
        const userTweet = users.find(
            (user) => user.username === tweet.username
        );
        tweet = { ...tweet, avatar: userTweet.avatar };
        tweets.push(tweet);
        res.status(201).send('OK');
    } else {
        res.status(400).send('Falta usu??rio ou tweet');
    }
});






