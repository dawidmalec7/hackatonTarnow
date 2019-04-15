use parkings;
insert into parkings (
	id, Address, NumberOfPlaces, NumberOfFreePlaces, NumberOfFreeCarsPlaces, NumberOfFreeDisabledPlaces, 
	NumberOfFreeCyclesPlaces, Longtitude, Latitude
) values ("9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", "Rybna 33-110 Tarnów", 10, 10, 8, 2, 0, 50.013379, 20.988927 );


insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("185a99c8-d4de-4171-901e-ef2d1e417b64", false, null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e",  50.013471, 20.988950, "disabled");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("506fd533-978c-4da4-bc7e-6258b064a291", false, null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", 50.013461, 20.988991, "disabled");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("edaa4a41-8737-4819-85c0-9ecbeb691401", false,  null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", 50.013456, 20.989115, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("683ed233-c274-44c5-bdb7-6f20545f8938", false,  null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", 50.013461, 20.989249, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("b6893227-46fe-4648-95b0-721b07453003", false,  null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", 50.013339, 20.988956, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("3c4ccbb6-4a25-483a-8334-8675aedf9b48", false,  null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", 50.013355, 20.989107, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("4ce95eca-0204-4bca-8bf9-dda7d295a5c7", false,  null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", 50.013215, 20.988850, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("9fa18aa9-8b59-4c9b-baba-bd37a0147549", false,  null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", 50.013232, 20.988987, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("7c841820-8f98-40c2-8a7b-9fb2f9dc8b6d", false,  null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", 50.013251, 20.989141, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("1574af47-2e76-4c16-a70f-95734f23005d", false,  null, "9b1dbbc2-0ff4-4189-91d1-cc3b5defab9e", 50.013278, 20.989271, "car");

insert into parkings (
	id, Address, NumberOfPlaces, NumberOfFreePlaces, NumberOfFreeCarsPlaces, NumberOfFreeDisabledPlaces, 
	NumberOfFreeCyclesPlaces, Longtitude, Latitude
) values ("60890ce0-a228-4374-9bd8-d9d4ca9a822d", "Lwowska 24, 33-100 Tarnów", 10, 10, 9, 1, 0, 50.013799, 20.995933 );


insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("ee3f2e8e-c17b-46f3-9497-82f59a5a0eaa", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.013788, 20.995988, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("096193be-2e37-476d-aaf8-0b8accc91627", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.013875, 20.995969, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("1285025e-ba95-4a41-9b58-53d6062140ea", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.013969, 20.995941, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("08efd8bc-1d61-4fa6-84fc-b74f457b3ed4", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.014055, 20.995902, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("69165c3b-91ee-4d73-9ac1-4819ca9a82ec", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.014145, 20.995865, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("0138c3bf-e23d-40aa-86ca-75ffe8eab65f", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.014255, 20.995812, "car");

insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("d00969de-e03f-4ee7-971c-4a79b9634321", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.014304, 20.995778, "disabled");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("9afeb4b4-7f02-4ad0-8d87-848ac29610d0", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.014398, 20.995728, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("5424af55-22b1-4dde-b7cc-b8c4dda94a60", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.014494, 20.995696, "car");
insert into spaces (id, IsBusy, Plate, ParkingId, Longtitude, Latitude, SpaceType)
	values ("34b4d494-736b-42c9-b01d-22791da14822", false,  null, "60890ce0-a228-4374-9bd8-d9d4ca9a822d", 50.014596, 20.995679, "car");
