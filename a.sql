SET SQL_SAFE_UPDATES = 0;
use marketplace;
select * from products;
select	* from products order by category,subcategory,id desc limit 20;
select distinct category,subcategory from products  ;
update  products set description = null where description=10;
select	* from products where id< 5 or id>10 order by id desc limit 20 ;
select id ,subcategory from products group by subcategory order by id desc;

select * from products where id in (select max(id) from products group by subcategory);
select * from products where id in (?);
CREATE TABLE shoppingBag (id serial primary key , userId  bigint(20) unsigned,
quantity int
,productId  bigint(20) unsigned,
foreign key (userId) references users(id) on delete cascade,
foreign key (productId) references products(id) on delete cascade

);
select * from users;
select * from shoppingBag;
insert into  shoppingBag (userid,quantity,productId)value(1,1,2);
delete from   shoppingBag where userId=1