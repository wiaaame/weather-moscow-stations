import { BackButtonComponent } from "../../components/back-button/index.js";
import { ButtonHome } from "../../components/button-home/index.js";
import { ProductComponent } from "../../components/product/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    // ДЗ: проверка палиндрома
    isPalindrome(str) {
        const cleaned = str.toLowerCase().replace(/\s/g, '');
        return cleaned === cleaned.split('').reverse().join('');
    }

    getData() {
        const stations = {
            1: { id: 1, name: "ВДНХ", temp: "-2.5", humidity: "78%", pressure: "1012 hPa", lastUpdate: "2026-04-22 08:00", src: "https://picsum.photos/id/15/600/400", description: "Основная метеостанция Москвы. Данные с 1939 года." },
            2: { id: 2, name: "Балчуг", temp: "-1.8", humidity: "75%", pressure: "1013 hPa", lastUpdate: "2026-04-22 08:15", src: "https://picsum.photos/id/104/600/400", description: "Станция в центре Москвы, показывает микроклимат Замоскворечья." },
            3: { id: 3, name: "Тушино", temp: "-3.2", humidity: "82%", pressure: "1011 hPa", lastUpdate: "2026-04-22 07:45", src: "https://picsum.photos/id/96/600/400", description: "Северо-запад Москвы, часто на 1-2° холоднее центра." },
            4: { id: 4, name: "МГУ", temp: "-2.1", humidity: "76%", pressure: "1012 hPa", lastUpdate: "2026-04-22 08:30", src: "https://picsum.photos/id/12/600/400", description: "Воробьёвы горы, высота над уровнем моря влияет на показания." }
        };
        return stations[this.id];
    }

    goToMain() {
        import("../main/index.js").then(module => {
            const MainPage = module.MainPage;
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });
    }

    render() {
        const data = this.getData();
        if (!data) {
            this.parent.innerHTML = '<p>Станция не найдена</p>';
            return;
        }

        // Хедер
        this.parent.innerHTML = `
            <div class="custom-header">
                <div class="logo">
                    <h1>🌡️ ${data.name}</h1>
                    <p>Метеостанция</p>
                </div>
                <div id="home-header"></div>
            </div>
            <div id="product-detail" class="container" style="padding: 2rem; max-width: 800px;"></div>
        `;

        // Кнопка Домой
        const homeContainer = document.getElementById('home-header');
        const homeBtn = new ButtonHome(homeContainer);
        homeBtn.render(() => this.goToMain());

        // Детали станции
        const detailDiv = document.getElementById('product-detail');
        const isPalin = this.isPalindrome(data.name);
        const palinBadge = isPalin ? '<span style="background:#ffc107; padding:4px 12px; border-radius:20px; margin-left:12px;">🏆 Палиндром!</span>' : '';
        
        const enhancedData = {
            ...data,
            title: `${data.name} ${palinBadge}`,
            text: data.description
        };
        
        const productComp = new ProductComponent(detailDiv);
        productComp.render(enhancedData);

        // Кнопка Назад
        const backBtn = new BackButtonComponent(detailDiv);
        backBtn.render(() => this.goToMain());
    }
}