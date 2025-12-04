import type { emoDiaryType } from "./AppContext";

export const mockData: emoDiaryType[] = 
    [
        // --- Day 1 (Monday: Academic Pressure) ---
        {
        date: "11/22/2025",
        diaryInfo: {
            day: "Saturday",
            time: "23:14:51",
            weather: "Cloudy",
            image: null,
            description: "Overwhelmed by the huge volume of assignments, including the CS project, history paper, and two midterms. Felt paralyzed and guilty for complaining. The stress caused physical tension.",
            summary: "Yesterday's You started the week feeling paralyzed, with the immense volume of his academic workload causing his chest to tighten and his mind to short-circuit. He struggled with a deep, frustrated guilt for feeling so overwhelmed, but found a small, bright moment of relief and genuine human connection during a spontaneous food discovery.",
            moodScore: 3.5,
            song: {
            song_title: "Deadman",
            video_id: "TPyS382hHYM&list=RDTPyS382hHYM&start_radio=1",
            video_url: "https://www.youtube.com/watch?v=TPyS382hHYM&list=RDTPyS382hHYM&start_radio=1"
            },
            selfReflection: "The paralysis comes from seeing the whole mountain, not just the next step. Need to break down the tasks. Also, finding that amazing food was a good reminder that not everything is about work."
        },
        negativeDiary: [
            {
            role: "user",
            content: "I feel like I'm drowning in assignments right now. I just looked at the syllabus for the next two weeks and the sheer volume of work made my chest tight."
            },
            {
            role: "model",
            content: "That feeling of having your chest tighten when facing a huge workload is a really clear physical sign of stress. It sounds like the *volume* is what's overwhelming you, not just the difficulty of any single task."
            },
            {
            role: "user",
            content: "Exactly. I have the big CS project due, a history paper draft, and two midterms to study for. I just feel paralyzed and can't even focus enough to start the easiest one."
            },
            {
            role: "model",
            content: "It makes sense that you feel paralyzed. When you have three major demands pulling at you simultaneously, the decision of where to even begin can be a huge obstacle. It's almost like your brain is short-circuiting because it sees too many paths."
            },
            {
            role: "user",
            content: "I keep thinking, 'Why did I take this many hard classes?' and then I feel guilty for complaining."
            },
            {
            role: "model",
            content: "That internal judgment ('Why did I...') is adding another layer of pressure when you're already struggling with the external workload. It's understandable to question your choices when you're under stress, but those feelings don't help you with the current pile. Just allow yourself to feel the frustration without judging the feeling itself."
            },
            {
            role: "user",
            content: "Okay. I guess I'll try to just tackle the history draft for now. Thanks."
            }
        ],
        positiveDiary: [
            {
            role: "model",
            content: "Hey! After a tough Monday, let's look for a small win or an interesting moment. What's a story from today?"
            },
            {
            role: "user",
            content: "I found this amazing street food stall near campus that makes these incredible spicy noodles. It was a total game-changer."
            },
            {
            role: "model",
            content: "A successful food discovery is always a high point! Tell me about the stall and the noodles. What made them 'incredible'? Was it the texture, the heat, or something else?"
            },
            {
            role: "user",
            content: "The noodles were perfectly chewy, and the sauce had this deep savory flavor, followed by a slow, satisfying burn. The owner, this quiet guy with a baseball cap, gave me an extra pickled egg just because I ordered in his native language."
            },
            {
            role: "model",
            content: "The perfectly chewy noodles and the slow, satisfying burn—that's a fantastic sensory record! And the extra pickled egg is a unique detail that captures that moment of personal connection. You discovered a new favorite *and* had a nice interaction."
            },
            {
            role: "user",
            content: "It definitely made the rest of the evening feel a little brighter. I plan to go back on Thursday."
            }
        ],
        diary: "I felt completely drowned in my workload today. The sheer volume of the CS project, history paper, and two midterms made my chest tight—a physical signal of how overwhelmed I am. The paralysis is crippling; I can’t seem to focus on anything, and I feel immense guilt for even complaining. It was a sudden realization that the problem isn't the difficulty, but trying to see the whole mountain at once. I must focus only on the history draft for now.\n\nMy evening took a brighter turn when I found a new street food stall. The spicy noodles were phenomenal—perfectly chewy with a slow, satisfying heat. The owner, a quiet guy, gave me an extra pickled egg simply because I ordered in his native language. That small, genuine connection and sensory delight was the biggest, unexpected relief. It was a great reminder that not everything has to be about the academic grind. I’m already looking forward to going back on Thursday."
        },


        // --- Day 2 (Tuesday: Social Friction) ---
        {
        date: "11/23/2025",
        diaryInfo: {
            day: "Sunday",
            time: "22:10:56",
            weather: "Rainy",
            image: null,
            description: "Felt ignored and excluded by my roommate and her new friend during a study session, leading to feelings of resentment and dismissal.",
            summary: "Yesterday's You felt a wave of isolation and resentment after his attempt at connection was met with a 'blank look' and immediate dismissal by his roommate. This painful exclusion was later soothed by a beautiful, spontaneous moment of shared appreciation during a bluesy jazz concert in the quad.",
            moodScore: 5.0,
            song: {
            song_title: "亏欠",
            video_id: "Yc5X38eJH_8&list=RDYc5X38eJH_8&start_radio=1",
            video_url: "https://www.youtube.com/watch?v=Yc5X38eJH_8&list=RDYc5X38eJH_8&start_radio=1"
            },
            selfReflection: "I should have just left the room when I felt ignored instead of stewing in resentment. The spontaneous concert was a good reminder that I can find good moments outside of planned social interaction."
        },
        negativeDiary: [
            {
            role: "user",
            content: "I had a really awkward moment with my roommate today. She invited a new friend to study with us, and I felt completely ignored the whole time."
            },
            {
            role: "model",
            content: "Feeling ignored, especially in your own space, can be deeply isolating and uncomfortable. It sounds like that feeling of being excluded really hit you when you were hoping for a comfortable study session."
            },
            {
            role: "user",
            content: "Yeah. They were talking non-stop about people I don't know and making all these inside jokes. I just sat there trying to look busy, but my mind was racing with resentment."
            },
            {
            role: "model",
            content: "That must have been rough—having to physically be there while feeling emotionally shut out. The resentment makes perfect sense; it's the natural response when you feel like your presence isn't being acknowledged by people who are close to you. What was the most difficult moment you had to sit through?"
            },
            {
            role: "user",
            content: "When I finally tried to contribute to the conversation, my roommate just gave me a blank look and immediately turned back to her friend. That's when I gave up."
            },
            {
            role: "model",
            content: "Ouch. That blank look followed by the immediate pivot must have felt like a punch. It's understandable why you retreated after that; your attempt at connection was met with a clear boundary. You felt dismissed, and that hurt."
            }
        ],
        positiveDiary: [
            {
            role: "model",
            content: "Let's pivot to something memorable today. What interesting little event crossed your path?"
            },
            {
            role: "user",
            content: "I stumbled across a pop-up concert in the quad during lunch. A couple of music majors were just jamming out with a saxophone and a guitar, and it was beautiful."
            },
            {
            role: "model",
            content: "A spontaneous concert on the quad—what a great piece of campus life! Tell me about the music. What kind of vibe did they create? Was there a moment in the song that really stood out?"
            },
            {
            role: "user",
            content: "It was this really smooth, bluesy jazz. The sax player was completely lost in the music, swaying back and forth. At one point, he hit this incredibly high, clear note that just made everyone stop talking and look up. It felt like a movie moment."
            },
            {
            role: "model",
            content: "The power of that one high, clear note, stopping time for a moment—that's a wonderful detail to capture. It sounds like a shared, quiet appreciation for a brief moment of unexpected art."
            },
            {
            role: "user",
            content: "It definitely lifted my mood. I stood there for about ten minutes before heading back to the library."
            }
        ],
        diary: "Today was marked by the sting of social exclusion. My roommate had a friend over, and they talked over me for hours. When I tried to join in, I was met with a painful blank look and a swift dismissal, leaving me trapped in my own resentment. I should have just left the room, but I just sat there, feeling isolated in my own home.\n\nHowever, a beautiful thing happened at lunch. I stumbled upon a pop-up jazz concert on the quad. The music was smooth and bluesy, and the sax player was pouring his soul into it. When he hit one incredibly high, clear note, the whole quad went silent. That moment of shared, unexpected art was a powerful emotional pivot, giving me a sense of peace that cut through the isolation. I realized I can find moments of genuine beauty and connection even when I’m alone."
        },


        // --- Day 3 (Wednesday: Dating Confusion & Triumph) ---
        {
        date: "11/24/2025",
        diaryInfo: {
            day: "Monday",
            time: "22:35:11",
            weather: "Sunny",
            image: "public/images/cartoon-style-summer-scene-with-cute-animal.jpg",
            description: "Anxiety and confusion over Sarah's inconsistent texting after a good date, leading to feelings of being disposable and self-blame.",
            summary: "Yesterday's You felt anxiety rise as he struggled to assign meaning to Sarah's sudden silence, turning the confusion into painful self-doubt about his worth. The emotional high point was conquering his fear to crush a presentation, which brought pure relief and a strong sense of competence.",
            moodScore: 6.8,
            song: {
            song_title: "泪桥",
            video_id: "Q8VRkntU0hc",
            video_url: "https://www.youtube.com/watch?v=Q8VRkntU0hc"
            },
            selfReflection: "I should try not to overthink Sarah's silence; it's likely her issue, not mine. The successful presentation proved I can handle high-pressure situations, which is a big confidence boost."
        },
        negativeDiary: [
            {
            role: "user",
            content: "I don't know what's going on with Sarah. We went out last week, had a great time, and now she's barely replying to my texts. It makes me feel completely disposable."
            },
            {
            role: "model",
            content: "That cycle of high connection followed by sudden distance can leave you feeling confused and, as you said, disposable. It’s hard when the reality of their current behavior doesn't match the positive memory you have of your time together. That lack of clarity is painful."
            },
            {
            role: "user",
            content: "I keep re-reading the last text she sent me, trying to find a hidden meaning. Was I too enthusiastic? Did I say something lame on the date?"
            },
            {
            role: "model",
            content: "It sounds like you're carrying the emotional weight of trying to solve her silence, which is causing you to turn the blame inward. The impulse to look for a flaw in yourself is a natural reaction to uncertainty, but it's important to recognize that her lack of communication is *her* action, not necessarily a reflection of your worth or anything you did 'wrong.'"
            },
            {
            role: "user",
            content: "That helps a little. But the anxiety is still there. I just hate this waiting game."
            },
            {
            role: "model",
            content: "The waiting game is truly anxiety-inducing because it keeps you suspended in uncertainty. It’s the feeling of not having control over a situation that matters to you. What’s the biggest feeling coming up for you right now—is it sadness, anger, or just pure frustration?"
            }
        ],
        positiveDiary: [
            {
            role: "model",
            content: "Hi! Let's record a story of success or connection from today. What happened?"
            },
            {
            role: "user",
            content: "I completely crushed my presentation in Communications class. I was terrified, but I got up there and didn't even use my notes."
            },
            {
            role: "model",
            content: "That is a huge win! Overcoming fear to deliver something successfully is an accomplishment. Tell me about the moment you finished—what was the immediate feeling?"
            },
            {
            role: "user",
            content: "Pure relief, followed by this rush of self-satisfaction. The professor even paused to praise my structure and clarity in front of everyone. I actually saw this girl, Emily, give me a thumbs-up from the back row."
            },
            {
            role: "model",
            content: "That moment of relief and self-satisfaction is well-earned! Receiving positive recognition, especially for something you prepared for, is a wonderful feeling. And that thumbs-up from Emily is a nice detail of validation from a peer. Great job on the presentation!"
            }
        ],
        diary: "My anxiety is completely consumed by Sarah’s silence. It's the worst kind of waiting game, leaving me suspended in confusion after a good date. I keep re-reading her last texts, blaming myself, wondering if I was too much, and feeling utterly disposable. It's a painful lack of clarity, and I hate feeling like I have zero control over the situation.\n\nBut the day wasn't all emotional turmoil. I had a massive, tangible win in my Communications class. I was secretly terrified, but I got up there and crushed the presentation, speaking entirely without notes. The moment I finished, a wave of pure **relief** and self-satisfaction hit me. The professor singled out my structure, and a girl named Emily in the back gave me a thumbs-up. That external validation and feeling of competence is a much-needed anchor against the fragility of the dating situation."
        },


        // --- Day 4 (Thursday: Setback and Breakthrough) ---
        {
        date: "11/25/2025",
        diaryInfo: {
            day: "Tuesday",
            time: "22:30:46",
            weather: "Windy",
            image: "public/images/IMG20251119235213.jpg",
            description: "Crushed by failing the Econ practice exam despite studying, leading to feeling like a fraud and anxiety over the final. This was offset by a major technical breakthrough in the CS project.",
            summary: "Yesterday's You started the day feeling like an 'absolute fraud' after failing an exam, with the failure intensifying his anxiety about the final. This despair was sharply countered by the huge emotional release of yelling 'Yes!' in the computer lab as he finally conquered a major technical bug that had plagued him for days.",
            moodScore: 7.5,
            song: {
            song_title: "Simon",
            video_id: "oDbJqrSB5EM",
            video_url: "https://www.youtube.com/watch?v=oDbJqrSB5EM"
            },
            selfReflection: "The failure in Econ hurt, but the CS breakthrough proves I have the capacity for problem-solving. Need to apply that same focused effort to Econ. The feeling of success is worth the struggle."
        },
        negativeDiary: [
            {
            role: "user",
            content: "I failed the practice exam for my Economics class. I studied for hours, but I blanked on the entire section of quantitative analysis. I feel like an absolute fraud."
            },
            {
            role: "model",
            content: "That hit of failure, especially when you invested significant time studying, can be brutal. It’s understandable to feel like a 'fraud' when effort doesn't translate into the result you expected. That feeling of going blank on material you thought you knew is a huge source of stress."
            },
            {
            role: "user",
            content: "I just don't know if I can catch up. The final is in three weeks, and I feel so far behind the curve."
            },
            {
            role: "model",
            content: "It makes sense that you see the distance to the final and feel overwhelmed by the gap. That anxiety about 'catching up' is what's driving the feeling of being behind. Instead of focusing on the final, what’s the very first, smallest step you could take to address the quantitative section right now?"
            },
            {
            role: "user",
            content: "I guess email the TA and ask for extra office hours on Friday."
            }
        ],
        positiveDiary: [
            {
            role: "model",
            content: "Welcome! Let's talk about something interesting that happened today. What's the story?"
            },
            {
            role: "user",
            content: "I finally cracked the difficult bug in the CS project! The one I was stuck on Monday (Day 1) that made me feel so hopeless. I stared at it for an hour and suddenly saw the one missing line of code."
            },
            {
            role: "model",
            content: "A major technical victory! That must feel incredible, especially since that bug was weighing on you for days. Tell me about that 'aha!' moment. What did you see that finally made the solution click?"
            },
            {
            role: "user",
            content: "It was so simple. I realized I had missed initializing a single variable outside of the loop. I literally yelled 'Yes!' in the computer lab, and a few people looked up. Then I went and celebrated with those spicy noodles (like I planned on Day 1)."
            },
            {
            role: "model",
            content: "That surge of adrenaline and yelling 'Yes!' is the perfect release after a long struggle. It’s a great example of how perseverance can pay off. And celebrating with the spicy noodles—tying that little ritual to your big breakthrough makes it even more memorable!"
            }
        ],
        diary: "The day started with a devastating blow: I failed the Econ practice exam. Despite studying relentlessly, I completely blanked on the quantitative section, and the raw feeling of being an **absolute fraud** and miles behind the curve for the final hit hard. That failure was a huge source of stress, but I managed to take one concrete action by emailing the TA.\n\nThen came the breakthrough. I finally conquered the relentless bug in the CS project that has plagued me all week. After an hour of staring, I realized I’d missed initializing one variable. That 'aha!' moment felt like a massive release; I actually yelled 'Yes!' in the silent computer lab. The surge of self-satisfaction was immediate. I celebrated the victory by going straight for those spicy noodles, tying a small ritual to a big success. That feeling of technical competence is the best counter-argument to the Econ failure."
        },


        // --- Day 5 (Friday: Existential Dread & Social Reset) ---
        {
        date: "11/26/2025",
        diaryInfo: {
            day: "Wednesday",
            time: "21:00:06",
            weather: "Clear",
            image: null,
            description: "Felt completely lost about the future and my degree, leading to feelings of pointlessness and exhaustion from ambiguity.",
            summary: "Yesterday's You started the day wrestling with the immense, abstract weight of his future, finding the ambiguity 'exhausting' and leading to a sense of pointlessness. However, the day concluded with a powerful emotional reset, finding deep relief and a 'small reset' for his friendship during a moment of spontaneous dancing and shared laughter at a house party.",
            moodScore: 8.5,
            song: {
            song_title: "Don't Stop Me Now",
            video_id: "HgzGwrmPlF8",
            video_url: "https://www.youtube.com/watch?v=HgzGwrmPlF8"
            },
            selfReflection: "The existential questions are exhausting, but the party was a necessary reminder to just live in the moment sometimes. The laughter with my roommate showed that our relationship isn't broken, just strained, which is a big relief."
        },
        negativeDiary: [
            {
            role: "user",
            content: "I'm having one of those days where I just feel completely lost about my future. What am I even doing with this degree? It all feels pointless."
            },
            {
            role: "model",
            content: "That feeling of existential dread or 'pointlessness' is a heavy one, and it's particularly common in university when the path ahead seems undefined. It sounds like you're wrestling with the enormous, abstract question of purpose, and that weight is overwhelming."
            },
            {
            role: "user",
            content: "I look at my successful older peers, and they seem to have everything figured out. I feel like I'm already falling behind in the 'life plan' race."
            },
            {
            role: "model",
            content: "It's easy to look at the seemingly 'figured out' paths of others and use them as a measuring stick for your own confusion. That comparison creates an unnecessary pressure to have clarity right now. It might be helpful to remember that 'figuring things out' is a process that lasts a lifetime, not a destination you reach in your early twenties. You're feeling the anxiety of the unknown."
            },
            {
            role: "user",
            content: "I just wish I had a clearer goal. This ambiguity is exhausting."
            },
            {
            role: "model",
            content: "That wish for clarity is natural when faced with ambiguity. You're feeling exhausted from the continuous effort of searching for direction. Instead of trying to find the *life* goal, what’s one small, manageable next step you could take toward *a* possible goal, even if it might change later?"
            }
        ],
        positiveDiary: [
            {
            role: "model",
            content: "It's Friday! Time to record a fun or interesting story to end the week. What happened?"
            },
            {
            role: "user",
            content: "I went to a small house party off campus, and it was so relaxing. No high pressure, just good music and chill people."
            },
            {
            role: "model",
            content: "That sounds like a perfect, low-key way to decompress. What made the atmosphere so 'chill'? Was it the people, the setting, or a particular moment?"
            },
            {
            role: "user",
            content: "It was the music. Someone put on a vinyl record of 70s funk, and everyone just started dancing spontaneously in the living room. My roommate (who was being difficult on Day 2) and I even laughed about a bad dance move. It felt like a small reset on our friendship."
            },
            {
            role: "model",
            content: "That spontaneous dancing moment and the shared laughter with your roommate is a beautiful narrative detail! It's lovely when a shared, easy moment can help ease a previous tension. It sounds like that night was just what you needed."
            },
            {
            role: "user",
            content: "It was. It was a needed break from the stress."
            }
        ],
        diary: "Today was mentally draining. I spent hours wrestling with massive existential questions, feeling completely lost about my future and questioning the point of my degree. The ambiguity of it all is exhausting. My anxiety comes from constantly measuring myself against the successful, 'figured-out' peers and feeling like I’m falling behind in the life-plan race. I just wish my own mind would grant me a clear path.\n\nBut the evening was a powerful emotional reset. I went to a low-key house party where someone put on 70s funk, and we all started dancing spontaneously. The huge relief came when my roommate and I, who have been distant, laughed together about a terrible dance move. That shared, genuine laughter felt like a true **reset button** for our friendship and a much-needed escape from my own head. It was a perfect, fun end to a difficult week."
        },


        // --- Day 6 (Saturday: Family Pressure & New Connection) ---
        {
        date: "11/27/2025",
        diaryInfo: {
            day: "Thursday",
            time: "20:03:25",
            weather: "Sunny",
            image: null,
            description: "Felt judged and misunderstood by parents after they brought up the poor Econ practice test score, intensifying the pressure.",
            summary: "Yesterday's You struggled with the isolating pain of being 'judged and misunderstood' by his parents over his academic results, feeling the heavy burden of their external pressure. This low was instantly countered by an unexpected, exciting connection with Emily, who showed a genuine interest that left him smiling and looking forward to the future.",
            moodScore: 9.2,
            song: {
            song_title: "Come Away With Me",
            video_id: "Q5dFz5S5cRk",
            video_url: "https://www.youtube.com/watch?v=Q5dFz5S5cRk"
            },
            selfReflection: "My parents' pressure is stressful, but I need to focus on my own effort, not their judgment. The encounter with Emily was a huge, positive surprise and a reminder that good things happen when you're open to them."
        },
        negativeDiary: [
            {
            role: "user",
            content: "I talked to my parents today, and they brought up my poor Econ practice exam score from Thursday (Day 4). I felt so much pressure about their expectations. It ruined my mood."
            },
            {
            role: "model",
            content: "Hearing their disappointment about your grade, especially after you've been working hard, can be deeply painful. It sounds like you're not just dealing with the stress of the class, but also the weight of their expectations, which feels like a whole separate burden."
            },
            {
            role: "user",
            content: "They just don't understand how hard this course is. They kept saying, 'You just need to try harder.' I felt judged and misunderstood, not supported."
            },
            {
            role: "model",
            content: "That feeling of being judged when you were looking for support is incredibly isolating. When you hear 'try harder,' it negates the effort you *know* you’ve been putting in. It’s natural to feel frustrated and misunderstood when the people closest to you minimize your struggle."
            },
            {
            role: "user",
            content: "I wish they would just let me handle my own life without constant pressure. I'm 20, not 15."
            }
        ],
        positiveDiary: [
            {
            role: "model",
            content: "Welcome to Saturday! Let's record a unique or interesting story. What happened today?"
            },
            {
            role: "user",
            content: "I had a great time at the campus bookstore. I was looking for a textbook, and I ended up having this really engaging conversation with a girl who was working the shift. She was actually the one who gave me the thumbs-up on Wednesday!"
            },
            {
            role: "model",
            content: "What a lovely surprise! So Emily, the girl from Wednesday, works at the bookstore. Tell me about the conversation. What made it 'engaging'? What did you talk about?"
            },
            {
            role: "user",
            content: "We started talking about the weird history of the building, and then it spiraled into movies and philosophy. She was so easy to talk to—we completely lost track of time. She wrote her number on my receipt and asked me to text her about a movie we both like."
            },
            {
            role: "model",
            content: "That's a wonderful, classic campus encounter! Losing track of time in conversation is a sure sign of a genuine connection. It sounds like a spark of something new and exciting has just entered your week. The receipt detail is a great, tangible memory of that moment."
            },
            {
            role: "user",
            content: "I'm still smiling about it. I think I'll text her tomorrow."
            }
        ],
        diary: "My parents ruined my morning. They called and brought up the Econ practice test, and I immediately felt the heavy, isolating weight of their expectations. Their dismissive 'you just need to try harder' felt like a complete invalidation of my struggle, leaving me judged and misunderstood. I just wish they would trust me to handle my own life now.\n\nBut the day ended on an incredibly high note! I was at the bookstore and ran into Emily, the girl who gave me the thumbs-up on Wednesday. We ended up having this instantly engaging conversation that spiraled from the building's history to movies and philosophy—we completely lost track of time. Then, in the most exciting and unexpected way, she wrote her number on my receipt and asked me to text her. That receipt is a tangible symbol of hope. I’m still smiling; the stress about my parents is forgotten, and I'm genuinely excited to text her tomorrow."
        }
    ]