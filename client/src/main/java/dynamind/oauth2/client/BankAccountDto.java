package dynamind.oauth2.client;

import java.io.Serializable;

/**
 * @author Petar Tahchiev
 * @since 1.5
 */
public class BankAccountDto implements Serializable {
    /**
     * Default serial version uid.
     */
    private final static long serialVersionUID = 42L;

    /**
     * The {@code code} of the {@link BankAccountDto}.
     */
    private String code;

    /**
     * The {@code label} of the {@link BankAccountDto}.
     */
    private String label;

    private String bankId;

    private String balance;

    public BankAccountDto(String bankId, String code, String label, String balance) {
        this.bankId = bankId;
        this.code = code;
        this.label = label;
        this.balance = balance;
    }

    /**
     * A getter method for the {@code code}.
     */
    public String getCode() {
        return code;
    }

    /**
     * A setter method for the {@code code}.
     *
     * @param code The value to set
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * A getter method for the {@code label}.
     */
    public String getLabel() {
        return label;
    }

    /**
     * A setter method for the {@code label}.
     *
     * @param label The value to set
     */
    public void setLabel(String label) {
        this.label = label;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }
}
