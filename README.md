# Toki Pona Practice (TPP) Version 2

# _Dont get too excited... work in progress!_

## With TPP2 You Can:

- Match Toki Pona Sitelen (Glyphs) with their Toki Pona Nimi (Words)
- Match Toki Pona Nimi with Their English Definitions
- Match English Words with Their Toki Pona Equivelents

## Motivation

I am interested in constructed languages. I have studied Esperanto, on and off (mostly off), for the last 20 years. After all of that time, I am still pretty bad at constructing an original Esperanto sentence, although I can read 60 or 70 percent of a non-technical text, even after a long period away from the language. Obviously, Esperanto is a language that can be used to say anything, and in that regard doesnt really differ from English or Spanish or German. But Toki Pona is different.

The reason I found Toki Pona especially interesting is that the language's entire vocabulary consists of just 120 words built from 14 sounds. With that, you can express almost any thought or emotion, but without a great deal of precision. I have often noted that you can easily tranlsate an English sentence into Toki Pona, but you cannot precisely translate that sentence back into English. It loses detail, like an old jpeg created with lossy compression.

This, I thought, is perfect. I can learn the rules of grammar, 14 letters, and 120 words, and I will have acquired a new language that I can use to write and say things I want to express without the worry that I am being understood. Yes. That's right. I want to talk about you, while you are standing there. I want to write down notes, without worrying that you will read them.

## Purpose of TPP2

The purpose of this app is to let me practice vocabulary and their associated glyphs wherever I happen to be. When I created TTP1, I just wanted to practice glyphs. And it is great for that. But often I found that I knew the glyph, and the word that goes with it, but after months of non-practice, I had forgotten the meaning of the word! Which was not really the point of learning the glyphs.

## React Native

Although Toki Pona Practive version 1 was a straight web app, I wanted to create a native app that could be used on Android or iPhone, without the hassle of using a web site. Thus, TPP2 was created using React Native, which allowed me to leverage my Javascript skills to build a native mobile app along side the usual web app. Any faults or bugs that TTP2 may have are entirely my fault. Sorry.

## The App

Based on the settings you select, TTP2 will present the question as a glyph (sitelen), a Toki Pona word (nimi) or an English word or phrase. You may choose to show only single Toki Pona words, or Toki Pona compund words. The app will give you four definitions to choose from. If you are set to show a sitelen as the question, the app will offer nimi. If you are set to show nimi, the app will offer English, and if you are set to offer questions in English, the app will offer nimi as answers. When you click on your answer, you will recieve immediate feedback. If you are correct, the answer you chose will turn green. If you are wrong, it will go red. Your score is instantly adjusted as well. Click the big button to move on to the next question.

## The Interface Language

The interface is in English. Future upgardes will incluse an option to display the interface in Toki Pona (as was the case with TPP1), as well as Toki Pona glyphs and possibly even Esperanto. The code for this change will be built out such that all strings could be deployed in any given laguage. That way, if anyone wants to contribute a Japanese or other language translation, it could easily be deployed in a minor update.

## Deployment

The ultimate goal is for this app to be available on the Play Store as well as the App Store. In the maentime, once this project is ready, I will deploy a sideload site. And of course, there is always the website version. I can only work on this project during my slack time, so I cannot promise when it will deploy. Hopefully by the end of 2020.

## Toki Pona Font

The font (linja pona 4.2) which makes glyph use possible was created by jan Same (tpmusilili@gmail.com). Resources related to this font are available at <http://musilili.net/linja-pona/>. The Github repo for the Linja Pona font is available at <https://github.com/janSame/linja-pona/>. It is used under the [Creative Commons](https://creativecommons.org/licenses/by/4.0/legalcode) license. Jan Same's YouTube channel can be found here, (<https://www.youtube.com/channel/UCO42VFlOyzxzi64INCBXfKQ/featured>) if you want to know more about Toki Pona. The authoritative book on Toki Pona, ["Toki Pona: The Language of Good"](https://amzn.to/2G1l6gd) by Sonja Lang is avaiable on Amazon.
