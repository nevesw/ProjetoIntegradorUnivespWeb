import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosDetalheComponent } from './pedidos-detalhe.component';

describe('PedidosDetalheComponent', () => {
  let component: PedidosDetalheComponent;
  let fixture: ComponentFixture<PedidosDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
