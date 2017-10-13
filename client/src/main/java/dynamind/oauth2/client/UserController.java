package dynamind.oauth2.client;

import org.javamoney.moneta.Money;
import org.javamoney.moneta.format.CurrencyStyle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.money.MonetaryAmount;
import javax.money.convert.ExchangeRateProvider;
import javax.money.convert.MonetaryConversions;
import javax.money.format.AmountFormatQueryBuilder;
import javax.money.format.MonetaryAmountFormat;
import javax.money.format.MonetaryFormats;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Controller
class UserController {

    @Autowired
    private OAuth2RestOperations restTemplate;

    private Map<String, BankAccountDto> bankAccounts = new HashMap<>();

    private String accessToken;

    @Value("${config.oauth2.resourceURI}")
    private String resourceURI;

    @Value("${config.oauth2.clientID}")
    private String username;

    @Value("${config.oauth2.clientSecret}")
    private String password;

    @RequestMapping("/")
    public String home(Model model) {

        model.addAttribute("bankAccounts", bankAccounts);

        return "homepage";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String addBankAccount(Model model) {

        Map response = restTemplate.getForObject(resourceURI, Map.class);

        List responseAccounts = (List) response.get("accounts");
        if (responseAccounts != null) {
            for (int i = 0; i < responseAccounts.size(); i++) {
                LinkedHashMap hashMap = (LinkedHashMap) responseAccounts.get(i);

                BankAccountDto bankAccountDto = new BankAccountDto((String) hashMap.get("bankId"), (String) hashMap.get("code"), (String) hashMap.get("label"),
                                                                   (String) ((Map) hashMap.get("balance")).get("formatted"));
                bankAccounts.put(bankAccountDto.getCode(), bankAccountDto);
            }
        }
        model.addAttribute("bankAccounts", bankAccounts);

        return "homepage";
    }

    @RequestMapping("/fetch")
    public String fetchAccount(Model model) {

        try {
            Map response = restTemplate.getForObject(resourceURI, Map.class);

            List responseAccounts = (List) response.get("accounts");
            if (responseAccounts != null) {
                for (int i = 0; i < responseAccounts.size(); i++) {
                    LinkedHashMap hashMap = (LinkedHashMap) responseAccounts.get(i);

                    BankAccountDto bankAccountDto =
                                    new BankAccountDto((String) hashMap.get("bankId"), (String) hashMap.get("code"), (String) hashMap.get("label"),
                                                       (String) ((Map) hashMap.get("balance")).get("formatted"));

                    bankAccounts.put(bankAccountDto.getCode(), bankAccountDto);
                }
            }
            model.addAttribute("bankAccounts", bankAccounts);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return "redirect:/";
    }

    @RequestMapping("/transfer")
    public String transfer(@RequestParam("from") String from, @RequestParam("to") String to, @RequestParam("amount") String amount,
                           @RequestParam("currency") String currency, Model model, RedirectAttributes redirAttr) {

        MonetaryAmount money = Money.of(new BigDecimal(amount), currency);
        ExchangeRateProvider exchangeRateProvider = MonetaryConversions.getExchangeRateProvider();
        MonetaryAmountFormat customFormat =
                        MonetaryFormats.getAmountFormat(AmountFormatQueryBuilder.of(Locale.US).set(CurrencyStyle.CODE).set("pattern", "¤0.00").build());

        BankAccountDto outgoing = bankAccounts.get(from);
        String outCurrenc = outgoing.getBalance().substring(0, 3);
        String outAmount = outgoing.getBalance().substring(3);
        MonetaryAmount outgoingBalance = Money.of(new BigDecimal(outAmount), outCurrenc);
        if (money.with(exchangeRateProvider.getCurrencyConversion("EUR")).isLessThanOrEqualTo(Money.of(new BigDecimal("800"), "EUR"))) {
            if (outgoingBalance.isGreaterThanOrEqualTo(money)) {
                outgoing.setBalance(customFormat.format(outgoingBalance.subtract(money)));
                bankAccounts.put(outgoing.getCode(), outgoing);

                BankAccountDto incoming = bankAccounts.get(to);
                String inCurrency = incoming.getBalance().substring(0, 3);
                String inAmount = incoming.getBalance().substring(3);

                incoming.setBalance(customFormat.format(
                                Money.of(new BigDecimal(inAmount), inCurrency).add(money.with(exchangeRateProvider.getCurrencyConversion(inCurrency)))));
                bankAccounts.put(incoming.getCode(), incoming);
            } else {
                redirAttr.addAttribute("msg", "Insufficient balance!");
            }
        } else {
            redirAttr.addAttribute("msg", "Transfer amount limit exceeded!");
        }
        //        try {
        //            HttpHeaders headers = new HttpHeaders();
        //
        //            headers.set("Authorization", "Bearer " + accessToken);
        //
        //            Map<String, String> vars = new HashMap<>();
        //            vars.put("amount", amount);
        //            vars.put("currency", currency);
        //
        //            HttpEntity<Map> entity = new HttpEntity<>(vars, headers);
        //
        //            restTemplate.exchange("http://bank.local:8111/storefront/facade/banks/dskbank/accounts/" + from + "/viewId/transaction-request-types/" + to
        //                                                  + "/transaction-requests", HttpMethod.POST, entity, Object.class);
        //        } catch (Exception ex) {
        //            ex.printStackTrace();
        //        }

        return "redirect:/";
    }

}