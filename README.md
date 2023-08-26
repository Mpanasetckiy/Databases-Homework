# Databases-Homework

### Tasks

1.  Which rooms have a rate of more than 100.00?

PREMIER
PREMIER PLUS
FAMILY

2.  List the reservations that have a checkin date this month and are for more than three nights.

cyf_hotels=# select cust_id, room_no, checkout_date - checkin_date as nights from reservations where checkin_date > '2023-08-01' and (checkout_date - checkin_date) > 2;
cust_id | room_no | nights
---------+---------+--------
4 | 312 | 3
131 | 301 | 6
117 | 101 | 4
119 | | 5
64 | | 3
51 | | 4
46 | | 4
19 | | 5
108 | | 3
9 | 305 | 6
91 | 211 | 5
41 | 302 | 5
106 | 206 | 5
123 | | 4
16 | | 6
126 | | 5
97 | | 3
20 | | 4
15 | | 4
79 | | 3
40 | | 3
9 | | 3
26 | | 3
96 | | 6
35 | | 5
38 | | 5
96 | | 5
12 | | 3
63 | | 5
66 | | 3
44 | | 4
129 | | 4
55 | | 4
93 | | 4
98 | | 6
(35 rows)

3.  List all customers from cities that begin with the letter 'M'.

cyf_hotels=# select \* from customers where city like 'M%';
id | name | email | phone | address | city | postcode | country  
-----+---------------------+------------------------------+--------------------+--------------------------------------------+-------------+----------+-------------
3 | Alice Evans | alice.evans001@hotmail.com | 0161 345 6789 | 3 High Road | Manchester | m13 4ef | UK
4 | Mohammed Trungpa | mo.trungpa@hotmail.com | 0161 456 7890 | 25 Blue Road | Manchester | M25 6GH | UK
6 | Nadia Sethuraman | nadia.sethuraman@mail.com | | 135 Green Street | Manchester | M10 4BG | UK
8 | Martín Sommer | martin.sommer@dfgg.net | (91) 555 22 82 | C/ Romero, 33 | Madrid | 28016 | Spain
9 | Laurence Lebihan | laurence.lebihan@xmzx.net | 91.24.4555 | 12, rue des Bouchers | Marseille | 13008 | France
14 | Peter Ferguson | peter.ferguson@mxnx.net | 03 9520 4555 | 636 St Kilda Road, Level 3 | Melbourne | 3004 | Australia
22 | Diego Freyre | diego.freyre@amyr.net | (91) 555 94 44 | C/ Moralzarzal, 86 | Madrid | 28034 | Spain
41 | Rachel Ashworth | rachel.ashworth@rzyb.net | (171) 555-1555 | Fauntleroy Circus | Manchester | EC2 5NT | UK
55 | Jean Fresnière | jean.fresnière@uxsm.net | (514) 555-8054 | 43 rue St. Laurent | Montréal | H1J 1C3 | Canada
56 | Alejandra Camino | alejandra.camino@omet.net | (91) 745 6555 | Gran Vía, 1 | Madrid | 28001 | Spain
66 | Peter Franken | peter.franken@fszx.net | 089-0877555 | Berliner Platz 43 | München | 80805 | Germany
88 | Jesus Fernandez | jesus.fernandez@cgxs.net | +34 913 728 555 | Merchants House, 27-30 Merchant's Quay | Madrid | 28023 | Spain
91 | Laurence Lebihan | laurence.lebihan@xmzx.net | 91.24.4555 | 12, rue des Bouchers | Marseille | 13008 | France
95 | Karin Josephs | karin.josephs@gyfv.net | 0251-555259 | Luisenstr. 48 | Münster | 44087 | Germany
103 | Arnold Cruz | arnold.cruz@awqa.net | +63 2 555 3587 | 15 McCallum Street, NatWest Center #13-03 | Makati City | 1227 MM | Philippines
105 | Akiko Shimamura | akiko.shimamura@pipl.net | +81 3 3584 0555 | 2-2-8 Roppongi | Minato-ku | 106-0032 | Japan
109 | Michael Donnermeyer | michael.donnermeyer@lvpk.net | +49 89 61 08 9555 | Hansastr. 15 | Munich | 80686 | Germany
118 | Martín Sommer | martín.sommer@wcoa.net | (91) 555 22 82 | C/ Araquil, 67 | Madrid | 28023 | Spain
121 | Carmen Anton | carmen.anton@bhmy.net | +34 913 728555 | c/ Gobelas, 19-1 Urb. La Florida | Madrid | 28023 | Spain
123 | Franco Ricotti | franco.ricotti@ycbk.net | +39 022515555 | 20093 Cologno Monzese, Alessandro Volta 16 | Milan | | Italy
125 | Hanna Moos | hanna.moos@fmga.net | 0621-08555 | Forsterstr. 57 | Mannheim | 68306 | Germany
(21 rows)

4.  Make a new room type of PENTHOUSE with a default rate of £185.00

cyf_hotels=# select \* from room_types;
room_type | def_rate
--------------+----------
FAMILY | 123.00
PREMIER | 110.00
PREMIER PLUS | 123.00
PREMIUM | 85.00
PREMIUM PLUS | 98.00
PENTHOUSE | 185.00
(6 rows)

5.  Add new rooms, 501 and 502 as room type PENTHOUSE and set the room rate of each to the default value (as in the new room type).

cyf_hotels=# insert into rooms (room_no, rate, room_type) values (501, 185.00, 'PENTHOUSE'), (502, 185.00, 'PENTHOUSE');
INSERT 0 2
cyf_hotels=# select \* from rooms;
room_no | rate | room_type | no_guests
---------+--------+--------------+-----------
101 | 85.00 | PREMIUM | 2
102 | 85.00 | PREMIUM | 2
103 | 85.00 | PREMIUM | 2
104 | 85.00 | PREMIUM | 2
105 | 85.00 | PREMIUM | 2
106 | 85.00 | PREMIUM | 2
107 | 85.00 | PREMIUM | 2
108 | 98.00 | PREMIUM PLUS | 2
109 | 98.00 | PREMIUM PLUS | 2
110 | 98.00 | PREMIUM PLUS | 2
111 | 98.00 | PREMIUM PLUS | 2
112 | 98.00 | PREMIUM PLUS | 2
201 | 85.00 | PREMIUM | 2
202 | 85.00 | PREMIUM | 2
203 | 85.00 | PREMIUM | 2
204 | 85.00 | PREMIUM | 2
205 | 85.00 | PREMIUM | 3
206 | 85.00 | PREMIUM | 3
207 | 85.00 | PREMIUM | 3
208 | 98.00 | PREMIUM PLUS | 2
209 | 98.00 | PREMIUM PLUS | 2
210 | 98.00 | PREMIUM PLUS | 2
211 | 98.00 | PREMIUM PLUS | 3
212 | 98.00 | PREMIUM PLUS | 3
301 | 110.00 | PREMIER | 2
302 | 110.00 | PREMIER | 2
303 | 110.00 | PREMIER | 2
304 | 110.00 | PREMIER | 2
305 | 110.00 | PREMIER | 2
306 | 110.00 | PREMIER | 2
307 | 110.00 | PREMIER | 2
308 | 123.00 | PREMIER PLUS | 2
309 | 123.00 | PREMIER PLUS | 2
310 | 123.00 | PREMIER PLUS | 2
311 | 123.00 | PREMIER PLUS | 2
312 | 123.00 | PREMIER PLUS | 2
401 | 110.00 | PREMIER | 2
402 | 110.00 | PREMIER | 2
403 | 110.00 | PREMIER | 2
404 | 110.00 | PREMIER | 2
405 | 110.00 | PREMIER | 2
406 | 110.00 | PREMIER | 2
407 | 110.00 | PREMIER | 2
408 | 123.00 | PREMIER PLUS | 2
409 | 123.00 | PREMIER PLUS | 2
410 | 123.00 | PREMIER PLUS | 2
411 | 123.00 | FAMILY | 4
412 | 123.00 | FAMILY | 4
501 | 185.00 | PENTHOUSE |  
 502 | 185.00 | PENTHOUSE |  
(50 rows)

6.  Add a new room 503 as a PREMIER PLUS type similar to the other PREMIER PLUS rooms in the hotel but with a room rate of 143.00 to reflect its improved views over the city.

        412 | 123.00 | FAMILY       |         4
         501 | 185.00 | PENTHOUSE    |
         502 | 185.00 | PENTHOUSE    |
         503 | 143.00 | PREMIER PLUS |

    (51 rows)
