import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input'
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatListModule} from '@angular/material/list';
import { MatTableModule} from '@angular/material/table'
import { MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule} from '@angular/material/menu';
import { MatBadgeModule} from '@angular/material/badge';
import { MatSortModule} from '@angular/material/sort';
import { MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSnackBarModule} from '@angular/material/snack-bar';

const materialComponents = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatTableModule,
  MatDialogModule,
  MatMenuModule,
  MatBadgeModule,
  MatSortModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule
]   

@NgModule({
 
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
