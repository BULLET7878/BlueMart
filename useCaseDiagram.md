# Use Case Diagram

```mermaid
useCaseDiagram
    actor "Customer" as C
    actor "Seller" as S
    actor "Payment Gateway (Stripe)" as PG

    package "BlueMart System" {
        usecase "Browse Products" as UC1
        usecase "Manage Cart" as UC2
        usecase "Checkout & Pay" as UC3
        usecase "Track Orders" as UC4
        usecase "Manage Addresses" as UC5
        usecase "Manage Inventory" as UC6
        usecase "View Sales Analytics" as UC7
        usecase "Authenticate (Login/Register)" as UC8
    }

    C --> UC1
    C --> UC2
    C --> UC3
    C --> UC4
    C --> UC5
    C --> UC8

    S --> UC6
    S --> UC7
    S --> UC8

    UC3 ..> PG : <<include>>
```
