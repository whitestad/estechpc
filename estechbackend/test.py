
SCRAP_PRICE = 3.1 / 100
COPPER_PRICE = 3.2 / 100
WIRES_PRICE = 8.5 / 100
PLASTIC_PRICE = 31 / 100

BLUE_CREATE_PRICE = 3
TURQUOISE_CREATE_PRICE = 15

scrap = 650 + 75 + 20 + 650 + 30 + 35
copper = 130 + 15 + 4 + 130 + 6 + 8

create_price = BLUE_CREATE_PRICE + BLUE_CREATE_PRICE + TURQUOISE_CREATE_PRICE

scrap += 50
copper += 100
wires = 100
plastic = 50

create_price += 15

result = 0

result += scrap * SCRAP_PRICE
result += copper * COPPER_PRICE
result += wires * WIRES_PRICE
result += plastic * PLASTIC_PRICE

result += create_price

print(result)

print(650 * SCRAP_PRICE + 130 * COPPER_PRICE + 3)

a = True
b = True
c = False