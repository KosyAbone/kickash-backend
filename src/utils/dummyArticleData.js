const mongoose = require('mongoose');
const Article = require('../Models/Articles');

// Desc: Dummy data for articles
const articles = [
    {
      title: "The Health Risks of Smoking and the Path to Quitting",
      content: `Smoking has long been recognized as a major risk factor for various health issues. 
                It significantly increases the chances of developing lung cancer, chronic obstructive pulmonary disease (COPD), and heart disease. 
                It's not just the smoker at risk; secondhand smoke also poses severe health threats to those nearby.
                Quitting smoking can significantly improve health outcomes. While it's challenging, it's entirely possible. 
                Support systems, counseling, and nicotine replacement therapies are among the various strategies that can aid in the journey towards becoming smoke-free.`,
      datePosted: "2023-06-15",
      author: "John Doe",
      posterUrl: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      videoUrl: "http://blacpythoz.insomnia247.nl/files/byteforce/vids/nicotine.mp4"
    },
    {
      title: "Discover the Benefits of Being Smoke-Free",
      content: `Once you quit smoking, your body starts to repair itself. Within hours of quitting, heart rate and blood pressure drop, and within days, lung function begins to improve. 
                Long-term benefits include reduced risk of heart attacks, strokes, and cancers.
                Being smoke-free not only improves physical health but also enhances overall well-being. 
                It's a step towards financial savings and creating a healthier environment for oneself and others.`,
      datePosted: "2023-06-20",
      author: "Jane Smith",
      posterUrl: "https://images.unsplash.com/photo-1660412377714-febabe778ea7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21va2UlMjBmcmVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      videoUrl: "http://blacpythoz.insomnia247.nl/files/byteforce/vids/quit.mp4"
    },
    {
      title: "How to Overcome Nicotine Addiction and Quit Smoking",
      content: `Nicotine, found in tobacco products, is highly addictive, making quitting smoking challenging for many. 
                Understanding the addiction's psychological and physiological aspects is crucial in devising effective strategies to quit.
                Behavioral therapies, medications, and support groups have proven effective in aiding individuals to overcome nicotine addiction. 
                Combining these approaches enhances the chances of successfully quitting smoking and maintaining a smoke-free life.`,
      datePosted: "2023-06-23",
      author: "Alex Johnson",
      posterUrl: "https://plus.unsplash.com/premium_photo-1661674304952-9b00876d9e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      videoUrl: "http://blacpythoz.insomnia247.nl/files/byteforce/vids/risk.mp4"
    },
    {
      title: "Understanding the Impact of Smoking on Your Lungs",
      content: `Smoking wreaks havoc on the lungs. It damages the airways and air sacs, leading to chronic lung diseases like emphysema and chronic bronchitis. 
                The risk of lung cancer significantly rises with smoking, making it the leading cause of lung-related illnesses.
                Quitting smoking is the best gift one can give their lungs. Over time, the lungs begin to heal, reducing the risk of further damage and allowing for better breathing.`,
      datePosted: "2023-06-25",
      author: "Sarah Williams",
      posterUrl: "https://images.unsplash.com/photo-1610975727119-cfdc910e2333?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cXVpdCUyMHNtb2tpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      videoUrl: "http://blacpythoz.insomnia247.nl/files/byteforce/vids/nicotine.mp4"
    },
    {
      title: "The Psychological Effects of Quitting Smoking",
      content: `Quitting smoking is not merely a physical challenge; it's equally demanding psychologically. 
                The abrupt cessation of a habit that's been deeply ingrained triggers various emotional responses. 
                Common feelings include anxiety, irritability, and restlessness.
                Understanding and preparing for these psychological effects is crucial. 
                Engaging in relaxation techniques, physical activities, and seeking professional support are effective ways to manage these emotions during the quitting process.
                Additionally, the psychological benefits of quitting smoking are immense. Improved mental clarity, reduced stress levels, and a sense of accomplishment significantly contribute to overall well-being.`,
      datePosted: "2023-06-27",
      author: "Michael Brown",
      posterUrl: "https://images.unsplash.com/photo-1502320282078-50af0ebdb6cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cXVpdCUyMHNtb2tpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      videoUrl: "http://blacpythoz.insomnia247.nl/files/byteforce/vids/quit.mp4"
    },
    {
      title: "10 Strategies to Help You Quit Smoking for Good",
      content: `Quitting smoking demands a multi-faceted approach. There's no one-size-fits-all solution, but various strategies can significantly increase the chances of success.
                Setting a quit date, identifying triggers, seeking social support, and using nicotine replacement therapies are among the numerous effective strategies. 
                Cognitive-behavioral therapy and prescription medications also prove beneficial for many.
                Tailoring a personalized plan that integrates several strategies increases the likelihood of successfully quitting smoking and staying smoke-free.`,
      datePosted: "2023-06-30",
      author: "Emily Davis",
      posterUrl: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1157&q=80"
    },
    {
      title: "The Role of Support Systems in Smoking Cessation",
      content: `Support systems play a pivotal role in smoking cessation. Engaging with friends, family, or support groups significantly increases the chances of successfully quitting smoking.
                Emotional encouragement, shared experiences, and peer support motivate individuals throughout their quitting journey. 
                The understanding and empathy offered by support systems can counter the challenges and setbacks associated with quitting smoking.`,
      datePosted: "2023-07-02",
      author: "David Wilson",
      posterUrl: "https://images.unsplash.com/photo-1579208570378-8c970854bc23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80",
      videoUrl: "http://blacpythoz.insomnia247.nl/files/byteforce/vids/risk.mp4"
    },
    {
      title: "From Smoker to Non-Smoker: Celebrating Success Stories",
      content: `Every journey from being a smoker to becoming smoke-free is an inspiring story of determination and resilience. 
                Celebrating success stories not only honors the individuals but also motivates others on a similar path.
                Sharing personal narratives, triumphs, and the challenges overcome while quitting smoking can inspire and encourage others facing similar struggles. 
                These success stories serve as a beacon of hope and strength in the quest for a smoke-free life.`,
      datePosted: "2023-07-05",
      author: "Jennifer Adams",
      posterUrl: "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      videoUrl: "http://blacpythoz.insomnia247.nl/files/byteforce/vids/nicotine.mp4"
    },
    {
      title: "The Financial Benefits of Quitting Smoking",
      content: `Quitting smoking not only brings about health improvements but also offers significant financial benefits. 
                The expenses associated with tobacco use, including the cost of cigarettes and potential medical bills, drastically reduce upon quitting.
                Additionally, the long-term financial implications are profound. Money previously spent on smoking can be directed towards savings, hobbies, or other enriching activities. 
                The savings from quitting smoking have a lasting positive impact on one's financial health.`,
      datePosted: "2023-07-08",
      author: "Robert Thompson",
      posterUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      videoUrl: "http://blacpythoz.insomnia247.nl/files/byteforce/vids/quit.mp4"
    }
  ];

  mongoose.connect('process.env.MONGO_URL', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', async () => {
    try {
        await Article.insertMany(articles);
        console.log('Dummy Article data inserted successfully!');
    } catch (error) {
        console.error('Error inserting dummy article data:', error);
    } finally {
      // Close the connection after inserting data (optional)
      mongoose.connection.close();
    }
  });