# VK Stories (VK Apps) ![npm](https://img.shields.io/npm/v/vk-stories.svg)
Данный модуль позволяет генерировать и шерить истории из ваших шаблонов.

## Установка 📦
Для того, чтобы установить модуль, используйте `yarn add vk-stories` или `npm i -S vk-stories`

## Быстрый старт 🚀
### Инициализация (init)
Обязательный метод перед началом работы.
```js
import VKStories from "vk-stories";
import connect from "@vkontakte/vkui-connect-promise";

VKStories.init(connect);
```

### Генерация историй (generateStoryFromTemplate)
Для генерации нужно передать ссылку на шаблон и поля, как это показано ниже.
```js
import VKStories from "vk-stories";
import connect from "@vkontakte/vkui-connect-promise";

const fields = [
    {
        x: 540,
        y: 1133,
        value: "Hello World",
        font: "96px Arial",
        align: "center",
        color: "#FFFFFF"
    }
];

VKStories.init(connect);
VKStories.generateStoryFromTemplate(require("./assets/template.png"), fields)
    .then((story) => {
        // code
    })
    .catch(console.error);
```

### Шеринг историй (shareStory)
Для шеринга нужно передать идентификатор вашего приложения вк, вашу историю в формате base64 
(если она сгенерирована с помощью этого модуля, то просто передайте результат) и параметров.
В промисе вы получите результат загрузки (как если бы делали по документации).
```js
import VKStories from "vk-stories";
import connect from "@vkontakte/vkui-connect-promise";

VKStories.init(connect);
VKStories.shareStory(6999763, story, { add_to_news: true })
    .then((result) => {
        // code
    })
    .catch(console.error);
```

## Работает с VK Stories 🙌
*   [НЕсдам](https://vk.com/app6999763)

## Авторы 🎨
*   [Степан Новожилов](https://vk.me/hit2hat)