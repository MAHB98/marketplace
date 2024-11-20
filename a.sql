SET SQL_SAFE_UPDATES = 0;
use marketplace;
select * from products;
select	* from products order by category,subcategory,id desc limit 20;
select distinct category,subcategory from products  ;
update  products set description = null where description=10;
select	* from products where id< 5 or id>10 order by id desc limit 20 ;
select id ,subcategory from products group by subcategory order by id desc;

select * from products where id in (select max(id) from products group by subcategory);
