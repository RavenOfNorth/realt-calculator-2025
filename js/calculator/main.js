import {defaultAgencyPercent} from "./defaultAgencyPercent/defaultAgencyPercent.module.js";
import {getAgencyFraction} from "./AgencyFraction/agencyFraction.module.js";
import {inputValidator} from "./inputValidator/inputValidator.module.js";

export function App () {
    if (!inputValidator()) return;
    // Получаем исходные данные для расчётов:
    const flatSquare = Number(document.getElementById("square").value); // Площадь квартиры
    const flatCost = Number(document.getElementById("cost-dollar").value); // Стоимость квартиры в $
    const exchangeRate = Number(document.getElementById("nbrb-dollar").value); // Курс доллара по НБ РБ

// Инициализируем поля вывода результатов расчётов
    const costForMeter = document.getElementById("adr-cost");
    const transactionFee = document.getElementById("transaction-fee");
    const agencyFraction = document.getElementById("agency-fraction");
    // const agentFraction = document.getElementById("agent-fraction");
    const sellerFraction = document.getElementById("seller-fraction");

    // Базовая величина в белорусских рублях
    const base = 40;

    inputValidator(flatSquare, flatCost);

    // Блок расчётов
    let costPerSquareMeter

    let bynFlatCost = flatCost * exchangeRate

    let baseFlatCost = Math.floor(((flatCost * exchangeRate) / base));

    if (flatSquare !== 0) {
        costPerSquareMeter = (flatCost / flatSquare).toFixed(2);
    } else {
        costPerSquareMeter = '-';
    }

    let agencyPercent = defaultAgencyPercent(baseFlatCost);
    let agencyFractionValue = getAgencyFraction(bynFlatCost, agencyPercent, exchangeRate);
    // let agentFractionValue = (agencyFractionValue / 2).toFixed(2);
    let sellerFractionValue = flatCost - agencyFractionValue;

    // Вывод
    costForMeter.textContent = costPerSquareMeter;
    transactionFee.textContent = agencyPercent.toFixed(2);
    agencyFraction.textContent = String(agencyFractionValue);
    // agentFraction.textContent = agentFractionValue;
    sellerFraction.textContent = sellerFractionValue.toFixed(2);
}